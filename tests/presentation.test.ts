import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const relatedSource = readFileSync('src/components/content/RelatedContent.tsx', 'utf8');
const homeSource = readFileSync('src/app/(delete-this-and-modify-page.tsx)/HomePage.tsx', 'utf8');
const projectsSource = readFileSync('src/app/projecten/page.tsx', 'utf8');
const blogDetailSource = readFileSync('src/app/blogs/[slug]/page.tsx', 'utf8');
const projectDetailSource = readFileSync('src/app/projecten/[slug]/page.tsx', 'utf8');
const blogsSource = readFileSync('src/app/blogs/page.tsx', 'utf8');
const blogCardSource = readFileSync('src/components/content/BlogCard.tsx', 'utf8');
const adminEditorSource = readFileSync('src/components/admin/ContentEditor.tsx', 'utf8');
const adminTableSource = readFileSync('src/components/admin/ContentTable.tsx', 'utf8');
const globalStyles = readFileSync('src/app/globals.css', 'utf8');

test('related content uses compact rows instead of archive cards', () => {
    assert.doesNotMatch(relatedSource, /BlogCard|ProjectCard/);
    assert.match(relatedSource, /related-row/);
});

test('allows the long project hero title to wrap at a natural breakpoint', () => {
    assert.match(projectsSource, /Praktijk&shy;voorbeelden/);
});

test('links resilient cities directly to the projects archive', () => {
    const resilientStart = homeSource.indexOf("id='resilient-cities'");
    const recentProjectStart = homeSource.indexOf("id='projecten'");
    const projectsLink = homeSource.indexOf("href='/projecten'", resilientStart);

    assert.ok(resilientStart !== -1);
    assert.ok(recentProjectStart !== -1);
    assert.ok(projectsLink > resilientStart);
    assert.ok(projectsLink < recentProjectStart);
    assert.match(homeSource, /Bekijk onze projecten/);
});

test('features a real blog post in its own homepage section', () => {
    assert.match(homeSource, /import \{ getFeaturedBlog \} from '@\/lib\/content\/repository'/);
    assert.match(homeSource, /const featuredBlog = await getFeaturedBlog\(\)/);
    assert.match(homeSource, /id='uitgelichte-blog'/);
    assert.match(homeSource, /href=\{`\/blogs\/\$\{featuredBlog\.slug\}`\}/);
    assert.match(homeSource, /src=\{featuredBlog\.image\}/);
    assert.match(homeSource, /\{featuredBlog\.title\}/);
    assert.match(homeSource, /href='\/blogs'/);
    assert.doesNotMatch(homeSource, /home-discovery/);
});

test('uses green for the featured blog and beige for contact', () => {
    assert.match(homeSource, /id='uitgelichte-blog' className='[^']*featured-blog[^']*texture-section[^']*text-\[#FDF5E2\][^']*'/);
    assert.match(homeSource, /id='contact' className='[^']*contact-section[^']*bg-\[#FDF5E2\][^']*text-\[#15583B\][^']*'/);
    assert.match(homeSource, /brand-button brand-button--outline/);
});

test('places related content in a supporting detail sidebar', () => {
    for (const source of [blogDetailSource, projectDetailSource]) {
        assert.match(source, /detail-layout/);
        assert.match(source, /detail-sidebar/);
    }
});

test('places detail back links in the green content section instead of the hero', () => {
    for (const source of [blogDetailSource, projectDetailSource]) {
        const heroStart = source.indexOf("className='detail-hero");
        const textureStart = source.indexOf("className='texture-section");
        const backLink = source.indexOf("className='detail-back");

        assert.ok(heroStart !== -1);
        assert.ok(textureStart !== -1);
        assert.ok(backLink !== -1);
        assert.ok(backLink > textureStart);
        assert.ok(backLink > heroStart);
    }
});

test('keeps related sidebar rows readable at a larger supporting scale', () => {
    assert.match(globalStyles, /grid-template-columns: 4\.8rem minmax\(0, 1fr\) 1\.15rem/);
    assert.match(globalStyles, /\.related-row__copy strong \{[\s\S]*?font-size: 1\.18rem/);
});

test('reserves space for related row arrows beside long titles', () => {
    assert.match(globalStyles, /grid-template-columns: 4\.8rem minmax\(0, 1fr\) 1\.15rem/);
    assert.match(globalStyles, /\.related-row__copy \{[\s\S]*?min-width: 0/);
    assert.match(globalStyles, /\.related-row__arrow \{[\s\S]*?justify-self: end/);
});

test('does not show or request blog reading times', () => {
    for (const source of [homeSource, blogsSource, blogDetailSource, blogCardSource, adminEditorSource]) {
        assert.doesNotMatch(source, /readTime|Leestijd/);
    }
});

test('shows content images in admin lists and editors', () => {
    assert.match(adminTableSource, /admin-table__thumbnail/);
    assert.match(adminTableSource, /src=\{item\.image\}/);
    assert.match(adminEditorSource, /AdminImageField/);
});

test('keeps the admin editor focused on content instead of technical fields', () => {
    assert.match(adminEditorSource, /AdminSectionsField/);
    assert.doesNotMatch(adminEditorSource, /name='slug'/);
    assert.doesNotMatch(adminEditorSource, /name='tags'/);
});

test('keeps the admin editor simple and uses flexible content blocks', () => {
    assert.match(adminEditorSource, /AdminSectionsField/);
    assert.doesNotMatch(adminEditorSource, /URL-slug|Tags, gescheiden|Korte samenvatting/);
    assert.match(adminEditorSource, /Categorie/);
});
