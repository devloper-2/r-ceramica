<?php

namespace App\Controllers\Admin;

use Config\Services;

/**
 * Triggers a rebuild of the static frontend. In production this fires a GitHub
 * `repository_dispatch` webhook (Phase 8) which runs: next build → export → FTP.
 *
 * A short debounce prevents repeated clicks from spamming builds.
 */
class Publish extends BaseAdminController
{
    private const DEBOUNCE_SECONDS = 120;

    public function trigger()
    {
        // Debounce: one publish per DEBOUNCE_SECONDS.
        $cache = Services::cache();
        if ($cache->get('last_publish')) {
            return redirect()->back()->with('error', 'A publish was just triggered. Please wait a moment before publishing again.');
        }

        $repo  = (string) (env('github.repo') ?? '');
        $token = (string) (env('github.token') ?? '');
        $event = (string) (env('github.eventType') ?? 'rebuild-site');

        if ($repo === '' || $token === '') {
            $this->audit->log('publish:not_configured', null, null);

            return redirect()->back()->with('error', 'Publish pipeline is not configured yet (set github.repo and github.token in .env). Coming in the deploy phase.');
        }

        try {
            $client = Services::curlrequest();
            $client->post("https://api.github.com/repos/{$repo}/dispatches", [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                    'Accept'        => 'application/vnd.github+json',
                    'User-Agent'    => 'RCeramica-Admin',
                ],
                'json'    => ['event_type' => $event],
                'timeout' => 10,
            ]);
            $cache->save('last_publish', time(), self::DEBOUNCE_SECONDS);
            $this->audit->log('publish:triggered', null, null);

            return redirect()->back()->with('success', 'Publish started — the live site will update in a few minutes.');
        } catch (\Throwable $e) {
            $this->audit->log('publish:failed', null, null);

            return redirect()->back()->with('error', 'Could not trigger publish: ' . $e->getMessage());
        }
    }
}
