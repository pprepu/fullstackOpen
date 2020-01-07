const listHelper = require('../utils/list_helper');
const importedBlogs = require('./blogs_for_tests').blogs;
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
];

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list is empty, returns zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list contains multiple blogs, returns the correct value', () => {
    const result = listHelper.totalLikes(importedBlogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {

  test('when list has only one blog, returns that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    const expected = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    };
    expect(result).toEqual(expected);
  });

  test('when list is empty, returns null', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe(null);
  });

  test('when list contains multiple blogs, returns the correct blog', () => {
    const result = listHelper.favoriteBlog(importedBlogs);
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    };
    expect(result).toEqual(expected);
  });
});

describe('most blogs', () => {

  test('works with 1 blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    const expected = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    };
    expect(result).toEqual(expected);
  });

  test('when list is empty, returns null', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe(null);
  });

  test('works with multiple blogs', () => {
    const result = listHelper.mostBlogs(importedBlogs);
    const expected = {
      author: "Robert C. Martin",
      blogs: 3
    };
    expect(result).toEqual(expected);
  });
});

describe('most likes', () => {

  test('works with 1 blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    };
    expect(result).toEqual(expected);
  });

  test('when list is empty, returns null', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toBe(null);
  });

  test('works with multiple blogs', () => {
    const result = listHelper.mostLikes(importedBlogs);
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    };
    expect(result).toEqual(expected);
  });
});