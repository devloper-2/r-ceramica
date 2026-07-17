<style>
/* ── Admin table ──────────────────────────────── */
.admin-table { font-size: .86rem; border-collapse: separate; border-spacing: 0; }
.admin-table thead th {
  background: var(--admin-surface-soft); font-size: .72rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: .06em; color: var(--admin-muted);
  border-bottom: 1px solid var(--admin-border); padding: .75rem 1rem;
}
.admin-table tbody td { padding: .8rem 1rem; border-bottom: 1px solid var(--admin-border); vertical-align: middle; }
.admin-table tbody tr:last-child td { border-bottom: none; }
.admin-table tbody tr:hover td { background: var(--admin-surface-soft); }

.slug-badge { background: rgba(201,162,75,.1); color: var(--admin-primary-dark); padding: 2px 8px; border-radius: 4px; font-size: .78rem; }
.sort-pill {
  display: inline-flex; align-items: center; justify-content: center; min-width: 30px; height: 22px;
  background: var(--admin-surface-soft); border: 1px solid var(--admin-border); border-radius: 20px;
  font-size: .75rem; font-weight: 600; color: var(--admin-muted);
}
.status-badge { font-size: .72rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
.status-badge.is-pub { background: #dcfce7; color: #166534; }
.status-badge.is-draft { background: #f1f5f9; color: #64748b; }

.cat-thumb { width: 44px; height: 44px; object-fit: cover; border-radius: 8px; border: 1px solid var(--admin-border); background: var(--admin-surface-soft); }
.cat-thumb-empty { display: inline-flex; align-items: center; justify-content: center; color: var(--admin-muted); }

/* ── Table action buttons ─────────────────────── */
.btn-tbl-action {
  display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px;
  border-radius: 7px; border: 1px solid var(--admin-border); background: var(--admin-surface-soft);
  color: var(--admin-muted); font-size: .88rem; cursor: pointer; text-decoration: none;
  transition: background .14s, color .14s, border-color .14s;
}
.btn-tbl-action.edit:hover { background: rgba(201,162,75,.12); color: var(--admin-primary); border-color: rgba(201,162,75,.4); }
.btn-tbl-action.danger:hover { background: #fee2e2; color: #dc2626; border-color: #fca5a5; }

/* ── Modal ────────────────────────────────────── */
.admin-modal { border: 1px solid var(--admin-border); border-radius: 14px; box-shadow: 0 20px 60px rgba(15,23,42,.18); }
.admin-modal .modal-header { border-bottom: 1px solid var(--admin-border); padding: 1.1rem 1.25rem .9rem; }
.admin-modal .modal-footer { border-top: 1px solid var(--admin-border); padding: .9rem 1.25rem; }
.admin-modal .modal-body { padding: 1.25rem; }

.admin-label { font-size: .82rem; font-weight: 700; color: var(--admin-text); margin-bottom: .35rem; }
.admin-input {
  border-color: var(--admin-border) !important; background: var(--admin-surface-soft) !important;
  font-size: .88rem; border-radius: 8px !important;
}
.admin-input:focus { border-color: var(--admin-primary) !important; box-shadow: 0 0 0 4px rgba(201,162,75,.15) !important; background: #fff !important; }

/* ── Editor form sections ─────────────────────── */
.form-section-title { font-size: .78rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--admin-muted); margin: 0 0 1rem; }
.img-preview { width: 100%; max-width: 220px; aspect-ratio: 16/10; object-fit: cover; border-radius: 10px; border: 1px solid var(--admin-border); background: var(--admin-surface-soft); }
</style>
