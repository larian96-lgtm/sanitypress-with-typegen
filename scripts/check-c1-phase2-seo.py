from pathlib import Path

root = Path(__file__).resolve().parents[1]
content = (root / 'src/lib/c1-pages.ts').read_text()
home = (root / 'src/ui/c1-homepage.tsx').read_text()
sitemap = (root / 'src/app/sitemap.ts').read_text()
llms = (root / 'src/app/llms.txt/route.ts').read_text()

required_paths = [
    '/business-loans/vehicle-finance',
    '/business-loans/tax-debt',
    '/business-loans/line-of-credit',
    '/business-loans/trade-finance',
    '/business-loans/commercial-fitout',
    '/blog/business-loan-requirements-australia',
    '/blog/how-business-lenders-assess-applications',
    '/blog/business-loan-interest-rates-and-fees',
    '/blog/secured-vs-unsecured-business-loans',
]

for path in required_paths:
    assert path in content, f'MISSING Phase 2 path in content: {path}'

required_phrases = [
    'Comparison One',
    'fit-first',
    'cash-flow',
    'Comparison One is not a lender',
    'General information only',
    'Start my funding-fit check',
]
for phrase in required_phrases:
    assert phrase in content or phrase in home, f'MISSING required phrase: {phrase}'

for forbidden in ['guaranteed approval', 'guaranteed funding', 'instant approval']:
    assert forbidden not in content.lower(), f'FORBIDDEN phrase present: {forbidden}'

for phrase in ['c1AllPages', 'baseUrl', 'page.path']:
    assert phrase in sitemap, f'Sitemap missing C1 wiring token: {phrase}'

for path in required_paths:
    assert path in content, f'MISSING from page library: {path}'
assert 'Comparison One' in llms and 'c1AllPages' in llms, 'llms.txt route missing C1 summary wiring'
print('C1 Phase 2 SEO checks passed')
