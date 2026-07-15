import assert from 'node:assert/strict';
import test from 'node:test';

import {
    blogPosts,
    featuredBlog,
    featuredProject,
    getBlogDetailRelated,
    getPaginatedItems,
    getProjectDetailRelated,
    getRelatedBlogPosts,
    getRelatedProjects,
    projects
} from '../src/lib/content.ts';

test('provides nine blogs and six projects', () => {
    assert.equal(blogPosts.length, 9);
    assert.equal(projects.length, 6);
});

test('uses valid featured items for the archive heroes', () => {
    assert.ok(blogPosts.some((post) => post.slug === featuredBlog.slug));
    assert.ok(projects.some((project) => project.slug === featuredProject.slug));
});

test('paginates blogs in three groups of three', () => {
    const firstPage = getPaginatedItems(blogPosts, 1, 3);
    const lastPage = getPaginatedItems(blogPosts, 3, 3);

    assert.equal(firstPage.items.length, 3);
    assert.equal(lastPage.items.length, 3);
    assert.equal(firstPage.totalPages, 3);
    assert.equal(lastPage.currentPage, 3);
    assert.notEqual(firstPage.items[0]?.slug, lastPage.items[0]?.slug);
});

test('normalizes invalid pagination values', () => {
    assert.equal(getPaginatedItems(blogPosts, 0, 3).currentPage, 1);
    assert.equal(getPaginatedItems(blogPosts, 99, 3).currentPage, 3);
});

test('returns related content without returning the current item', () => {
    const blog = blogPosts[0];
    const project = projects[0];
    const relatedBlogs = getRelatedBlogPosts(blog, 3);
    const relatedProjects = getRelatedProjects(project, 2);

    assert.equal(relatedBlogs.length, 3);
    assert.equal(relatedProjects.length, 2);
    assert.ok(relatedBlogs.every((item) => item.slug !== blog.slug));
    assert.ok(relatedProjects.every((item) => item.slug !== project.slug));
});

test('keeps related detail content within the same content type', () => {
    const blogRelated = getBlogDetailRelated(blogPosts[0]);
    const projectRelated = getProjectDetailRelated(projects[0]);

    assert.equal(blogRelated.kind, 'blogs');
    assert.equal(blogRelated.items.length, 3);
    assert.equal(projectRelated.kind, 'projects');
    assert.equal(projectRelated.items.length, 2);
});
