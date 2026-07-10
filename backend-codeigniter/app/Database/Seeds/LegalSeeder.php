<?php

namespace App\Database\Seeds;

use App\Models\PageModel;
use App\Models\SectionModel;
use CodeIgniter\Database\Seeder;

/**
 * Seeds the editable legal content (Privacy Policy, Terms & Conditions) as a
 * single `legal` section per page. The frontend renders this when present and
 * falls back to its built-in copy otherwise, so admins can edit the full text.
 */
class LegalSeeder extends Seeder
{
    public function run()
    {
        $pages    = model(PageModel::class);
        $sections = model(SectionModel::class);

        $this->seedLegal($pages, $sections, 'privacy', $this->privacy());
        $this->seedLegal($pages, $sections, 'terms', $this->terms());
    }

    private function seedLegal(PageModel $pages, SectionModel $sections, string $slug, array $content): void
    {
        $page = $pages->where('slug', $slug)->first();
        if (! $page) {
            return;
        }
        // Idempotent: skip if this page already has a legal section.
        if ($sections->where('page_id', $page['id'])->where('type', 'legal')->countAllResults() > 0) {
            return;
        }
        $sections->insert([
            'page_id'    => $page['id'],
            'type'       => 'legal',
            'sort_order' => 0,
            'content'    => $content,
            'is_active'  => 1,
        ]);
    }

    private function privacy(): array
    {
        return [
            'eyebrow'     => 'Legal',
            'titleLine1'  => 'Privacy',
            'titleLine2'  => 'Policy',
            'intro'       => 'We believe privacy is a fundamental right. This document explains how R Ceramica collects, uses, and protects your personal information.',
            'lastUpdated' => 'Last updated: January 2026',
            'footerNote'  => 'We may update this Privacy Policy periodically. Significant changes will be communicated via email or a notice on the website at least 30 days before taking effect.',
            'sections'    => [
                ['id' => 'information-we-collect', 'heading' => 'Information We Collect', 'content' => [
                    ['sub' => 'Information You Provide', 'body' => 'When you create an account, place an order, or contact our concierge team, we collect your name, mobile number, email address, shipping address, and payment information. For catalogue requests or studio appointments, we may also collect your company name and design brief.'],
                    ['sub' => 'Information Collected Automatically', 'body' => 'When you visit rceramica.com, we automatically receive your IP address, browser type, device identifiers, pages visited, and session duration. This data is collected via cookies and similar tracking technologies to improve performance and your browsing experience.'],
                    ['sub' => 'Information from Third Parties', 'body' => 'If you use social login or connect via WhatsApp Business, we receive basic profile information as permitted by those platforms. We may also receive updated delivery or address information from our logistics partners.'],
                ]],
                ['id' => 'how-we-use', 'heading' => 'How We Use Your Information', 'content' => [
                    ['sub' => 'Order Fulfilment', 'body' => 'We use your personal information to process transactions, arrange white-glove delivery, send order confirmations and tracking updates, and handle returns or inspections.'],
                    ['sub' => 'Personalised Experience', 'body' => 'We analyse browsing and purchase history to recommend collections, surface relevant new arrivals, and tailor your catalogue view to your aesthetic preferences.'],
                    ['sub' => 'Communication', 'body' => 'With your consent, we send product launches, exclusive previews, and event invitations via email or WhatsApp. You may unsubscribe at any time from any marketing communication.'],
                    ['sub' => 'Legal & Security', 'body' => 'We may use your data to comply with applicable laws and regulations, detect and prevent fraud, resolve disputes, and enforce our Terms of Service.'],
                ]],
                ['id' => 'sharing', 'heading' => 'Information Sharing', 'content' => [
                    ['sub' => 'We Do Not Sell Your Data', 'body' => 'R Ceramica does not sell, rent, or trade your personal information to third parties for their marketing purposes.'],
                    ['sub' => 'Service Providers', 'body' => 'We share information with trusted partners who assist us in operating our website and fulfilling orders — including payment processors (Razorpay / Stripe), logistics partners, and cloud infrastructure providers. These parties are contractually bound to keep your information confidential.'],
                    ['sub' => 'Legal Requirements', 'body' => 'We may disclose your information if required to do so by law, or if we believe such action is necessary to comply with a legal obligation, protect the rights or safety of R Ceramica, our customers, or others.'],
                ]],
                ['id' => 'cookies', 'heading' => 'Cookies & Tracking', 'content' => [
                    ['sub' => 'Essential Cookies', 'body' => 'These cookies are strictly necessary for the website to function — managing your session, maintaining your cart, and securing authentication. They cannot be disabled.'],
                    ['sub' => 'Analytics Cookies', 'body' => 'We use anonymised analytics to understand how visitors interact with our pages. No personally identifiable information is shared with analytics providers.'],
                    ['sub' => 'Preference Cookies', 'body' => 'These cookies remember your choices — such as preferred currency, language, or surface finish filters — so your next visit starts where you left off.'],
                ]],
                ['id' => 'your-rights', 'heading' => 'Your Rights', 'content' => [
                    ['sub' => 'Access & Portability', 'body' => 'You may request a copy of all personal data we hold about you, in a structured, machine-readable format, at any time.'],
                    ['sub' => 'Correction', 'body' => 'If any information we hold is inaccurate or incomplete, you have the right to request correction. You can update most information directly from your account dashboard.'],
                    ['sub' => 'Erasure', 'body' => 'You may request deletion of your personal data, subject to our legal obligations to retain certain records (such as transaction history for financial compliance). Deleted accounts cannot be recovered.'],
                    ['sub' => 'Withdrawal of Consent', 'body' => 'Where we process your data on the basis of consent, you may withdraw that consent at any time. This will not affect the lawfulness of processing carried out before withdrawal.'],
                ]],
                ['id' => 'security', 'heading' => 'Data Security', 'content' => [
                    ['sub' => 'Technical Safeguards', 'body' => 'All data in transit is encrypted with TLS 1.3. Payment data is handled by PCI-DSS certified processors and never stored on our servers. We conduct regular security audits and penetration tests.'],
                    ['sub' => 'Access Controls', 'body' => 'Access to customer data within R Ceramica is restricted on a strict need-to-know basis. All team members with data access undergo data-privacy training annually.'],
                ]],
                ['id' => 'retention', 'heading' => 'Data Retention', 'content' => [
                    ['sub' => 'How Long We Keep Data', 'body' => 'We retain your account information for as long as your account is active or as needed to provide services. Transaction records are retained for a minimum of 7 years to comply with financial regulations. Marketing preferences are reviewed and pruned annually.'],
                ]],
                ['id' => 'contact', 'heading' => 'Contact & Grievance', 'content' => [
                    ['sub' => 'Data Protection Officer', 'body' => 'For any privacy-related concern, data access request, or complaint, contact our Data Protection Officer at privacy@rceramica.com. We respond within 5 business days.'],
                    ['sub' => 'Grievance Officer', 'body' => 'In accordance with the Information Technology Act, 2000 and the rules thereunder, the name and contact details of our Grievance Officer are made available at the registered office address listed on the Contact page.'],
                ]],
            ],
        ];
    }

    private function terms(): array
    {
        return [
            'eyebrow'     => 'Legal',
            'titleLine1'  => 'Terms &',
            'titleLine2'  => 'Conditions',
            'intro'       => 'The terms and conditions governing your use of R Ceramica\'s website, products, and services. Please read carefully before placing an order.',
            'lastUpdated' => 'Last updated: January 2026',
            'footerNote'  => 'We may update these Terms periodically. Continued use of our services after changes take effect constitutes acceptance of the revised Terms.',
            'sections'    => [
                ['id' => 'acceptance', 'heading' => 'Acceptance of Terms', 'content' => [
                    ['sub' => 'Agreement to Terms', 'body' => 'By accessing or using the R Ceramica website (rceramica.com), placing an order, or engaging with our concierge services, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please discontinue use of our services immediately.'],
                    ['sub' => 'Eligibility', 'body' => 'You must be at least 18 years of age to place an order or create an account. By using our services, you represent that you are of legal age and have the legal capacity to enter into a binding agreement.'],
                    ['sub' => 'Amendments', 'body' => 'R Ceramica reserves the right to update or modify these Terms at any time. Material changes will be notified via email or a banner on the website at least 30 days prior to taking effect. Continued use of our services after the effective date constitutes acceptance of the revised Terms.'],
                ]],
                ['id' => 'products-orders', 'heading' => 'Products & Orders', 'content' => [
                    ['sub' => 'Product Descriptions', 'body' => 'We make every effort to display product images, finishes, and specifications as accurately as possible. However, colours and textures may appear differently depending on your display device. Physical samples are available upon request through our studio concierge and are strongly recommended before placing large-volume orders.'],
                    ['sub' => 'Pricing', 'body' => 'All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. Prices are subject to change without notice. The price applicable to your order is the price confirmed at checkout at the time of purchase.'],
                    ['sub' => 'Order Confirmation', 'body' => 'An order is confirmed only upon receipt of our written confirmation email and successful payment processing. We reserve the right to cancel or refuse any order at our sole discretion, including cases of suspected fraud, pricing errors, or unavailability of stock.'],
                    ['sub' => 'Custom & Made-to-Order Items', 'body' => 'Custom finishes, large-format cuts, or made-to-order pieces are non-refundable once production has commenced. Lead times for custom items are communicated at the time of order and are estimates only — R Ceramica shall not be liable for delays caused by manufacturing or logistics constraints.'],
                ]],
                ['id' => 'payment', 'heading' => 'Payment', 'content' => [
                    ['sub' => 'Accepted Methods', 'body' => 'We accept major credit and debit cards (Visa, Mastercard, American Express), UPI, net banking, and select BNPL options. All transactions are processed through PCI-DSS certified payment gateways. R Ceramica does not store your card details.'],
                    ['sub' => 'Payment Security', 'body' => 'All payment transactions are encrypted using TLS and processed by our certified payment partners. In the event of a payment failure, no funds will be debited. If you experience a discrepancy between your bank statement and our records, please contact our concierge within 7 days.'],
                    ['sub' => 'GST & Taxes', 'body' => 'Applicable Goods and Services Tax (GST) will be levied as per the prevailing rate under Indian tax law. For B2B purchases, please provide your GSTIN at checkout to receive a tax invoice. R Ceramica is not responsible for any customs duties or import taxes applicable to international shipments.'],
                ]],
                ['id' => 'delivery', 'heading' => 'Delivery & Logistics', 'content' => [
                    ['sub' => 'Delivery Areas', 'body' => 'We deliver across India and to select international destinations through our authorised logistics partners. Delivery timelines are estimates and may vary based on product availability, location, and logistics conditions. R Ceramica will not be held liable for delays caused by third-party logistics providers, natural events, or governmental actions.'],
                    ['sub' => 'White-Glove Service', 'body' => 'Premium white-glove delivery, including placement, unpacking, and on-site inspection, is available in select cities. This service must be selected at checkout and is subject to an additional fee. Our team will contact you to schedule a delivery window once your order is dispatched.'],
                    ['sub' => 'Risk of Loss', 'body' => 'Risk of loss and title for products pass to you upon delivery to the shipping address provided. Please inspect all deliveries at the time of receipt. Any damage or shortage must be reported in writing within 48 hours of delivery; claims made after this window may not be accepted.'],
                ]],
                ['id' => 'returns', 'heading' => 'Returns & Refunds', 'content' => [
                    ['sub' => 'Return Window', 'body' => 'Eligible items may be returned within 7 days of delivery in their original, unopened packaging, accompanied by the original invoice. Returns are not accepted for items that have been installed, altered, cut, or used in any way.'],
                    ['sub' => 'Non-Returnable Items', 'body' => 'Custom-ordered or made-to-order products, items on clearance, sample tiles, digital downloads (such as technical drawings or BIM files), and products showing signs of misuse or damage not attributable to R Ceramica are not eligible for return.'],
                    ['sub' => 'Refund Process', 'body' => 'Once a return is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds are processed to the original payment method within 7–10 business days. Shipping costs for returns are borne by the customer unless the return is due to a manufacturing defect or our error.'],
                    ['sub' => 'Defective Products', 'body' => 'If you receive a defective or incorrect item, contact our concierge immediately with photographic evidence. We will arrange a replacement or full refund at no additional cost. Our liability in all cases is limited to the value of the defective product purchased.'],
                ]],
                ['id' => 'intellectual-property', 'heading' => 'Intellectual Property', 'content' => [
                    ['sub' => 'Our Content', 'body' => 'All content on rceramica.com — including but not limited to text, photography, videos, 3D renders, collection names, product codes, and the R Ceramica brand identity — is the exclusive property of R Ceramica or its licensors and is protected by applicable intellectual property laws.'],
                    ['sub' => 'Permitted Use', 'body' => 'You may access and view content on our website for personal, non-commercial purposes only. You may not reproduce, distribute, republish, or create derivative works from any of our content without our prior written consent.'],
                    ['sub' => 'Trade Marks', 'body' => 'R Ceramica, the R Ceramica logo, and all associated product collection names are registered or unregistered trade marks of R Ceramica. Use of these marks without our express written permission is strictly prohibited.'],
                ]],
                ['id' => 'user-conduct', 'heading' => 'User Conduct', 'content' => [
                    ['sub' => 'Prohibited Activities', 'body' => 'You agree not to use our website or services to: violate any applicable law or regulation; upload or transmit harmful, offensive, or unlawful content; attempt to gain unauthorised access to our systems; engage in scraping, data mining, or automated data collection without our written consent; or impersonate any person or entity.'],
                    ['sub' => 'Account Responsibility', 'body' => 'You are responsible for maintaining the confidentiality of your account credentials. Any activity conducted through your account is your sole responsibility. Notify our team immediately if you suspect unauthorised access to your account.'],
                ]],
                ['id' => 'limitation-liability', 'heading' => 'Limitation of Liability', 'content' => [
                    ['sub' => 'Disclaimer', 'body' => 'Our website and services are provided on an \'as is\' basis. To the fullest extent permitted by law, R Ceramica disclaims all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.'],
                    ['sub' => 'Liability Cap', 'body' => 'In no event shall R Ceramica, its directors, employees, or affiliates be liable for any indirect, incidental, consequential, special, or punitive damages arising out of your use of our products or services. Our total aggregate liability for any claim shall not exceed the total amount paid by you for the specific order giving rise to the claim.'],
                    ['sub' => 'Force Majeure', 'body' => 'R Ceramica shall not be liable for any failure or delay in performance due to causes beyond our reasonable control, including natural disasters, pandemics, government actions, labour disputes, or failures of third-party service providers.'],
                ]],
                ['id' => 'governing-law', 'heading' => 'Governing Law & Disputes', 'content' => [
                    ['sub' => 'Jurisdiction', 'body' => 'These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Morbi, Gujarat, India.'],
                    ['sub' => 'Dispute Resolution', 'body' => 'We encourage you to contact our concierge in the first instance to resolve any concerns informally. If a dispute cannot be resolved amicably within 30 days, either party may pursue formal legal remedies as provided under applicable law.'],
                    ['sub' => 'Severability', 'body' => 'If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.'],
                ]],
            ],
        ];
    }
}
