const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

beforeAll(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }

  await User.deleteMany({});

  for (let user of helper.initialUsers) {
    let userObject = new User(user);
    await userObject.save();
  }

});

describe('listing all blogs: ', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(helper.initialBlogs.length);
  });

  test('returned blogs should have a identifier field called id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
    expect(response.body[0]._id).not.toBeDefined();
  });
});


describe('adding blogs: ', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New BLOG',
      author: 'Testaaja',
      url: 'justTesting.test',
      likes: 1
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAfterPost = await helper.blogsInDb();

    expect(blogsAfterPost.length).toBe(helper.initialBlogs.length + 1);

    const titles = blogsAfterPost.map(blog => blog.title);
    expect(titles).toContain('New BLOG');

  });

  test('if an added blog has no likes-field, it is set to 0', async () => {
    const newBlog = {
      title: 'New BLOG2',
      author: 'Testaaja',
      url: 'justTesting.test',
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test('if an added blog does not have a title field, it is not added and returns code 400', async () => {
    const newBlog = {
      author: 'Testaaja',
      url: 'justTesting.test',
      likes: 1
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

  });


  test('if an added blog does not have a url field, it is not added and returns code 400', async () => {
    const newBlog = {
      title: 'New BLOG',
      author: 'Testaaja',
      likes: 1
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

  });
});

describe('deleting a blog', () => {
  test('succeeds with code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAfterDeletion = await helper.blogsInDb();

    expect(blogsAfterDeletion.length).toBe(blogsAtStart.length - 1);

  });
});

describe('updating a blog', () => {
  test('works and updates current blogs', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToUpdate = blogsAtStart[0];

    const testTitle = 'Updated title!';
    blogToUpdate.title = testTitle;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    const blogsAfterUpdate = await helper.blogsInDb();

    const titles = blogsAfterUpdate.map(blog => blog.title);
    expect(titles).toContain(testTitle);
  });
});

describe('adding a user', () => {
  test('works when username is unique and both it and password are over 3 characters long', async () => {
    const newUser = {
      username: 'tosiTestaaja',
      name: 'jalmari k',
      password: 'jjjalmari'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAfterPost = await helper.usersInDb();

    expect(usersAfterPost.length).toBe(helper.initialUsers.length + 1);

    const usernames = usersAfterPost.map(user => user.username);
    expect(usernames).toContain('tosiTestaaja');
  });

  test('returns both a correct status code and an error message and does not add a new user, if username is not unique', async () => {
    const usersBeforePost = await helper.usersInDb();

    const newUser = {
      username: 'testaaja',
      name: 'validationERRORtest',
      password: 'jjjalmari'
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAfterPost = await helper.usersInDb();

    const names = usersAfterPost.map(user => user.name);
    expect(names).not.toContain('validationERRORtest');
    expect(usersAfterPost.length).toBe(usersBeforePost.length);
    expect(response.body.error).toBe('username needs to be unique and at least 3 characters long');

  });

  test('returns both a correct status code and an error message and does not add a new user, if username is shorter than 4 characters', async () => {
    const usersBeforePost = await helper.usersInDb();

    const newUser = {
      username: 'TOS',
      name: 'validationERRORtest2',
      password: 'jjjalmari'
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAfterPost = await helper.usersInDb();

    const names = usersAfterPost.map(user => user.name);
    expect(names).not.toContain('validationERRORtest2');
    expect(usersAfterPost.length).toBe(usersBeforePost.length);
    expect(response.body.error).toBe('username needs to be unique and at least 3 characters long');

  });

  test('returns both a correct status code and an error message and does not add a new user, if password is shorter than 4 characters', async () => {
    const usersBeforePost = await helper.usersInDb();

    const newUser = {
      username: 'johannes',
      name: 'validationERRORtest3',
      password: 'TOS'
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAfterPost = await helper.usersInDb();

    const names = usersAfterPost.map(user => user.name);
    expect(names).not.toContain('validationERRORtest3');
    expect(usersAfterPost.length).toBe(usersBeforePost.length);
    expect(response.body.error).toBe('password needs to be at least 3 characters long');

  });

  test('returns both a correct status code and an error message and does not add a new user, if password is not set', async () => {
    const usersBeforePost = await helper.usersInDb();

    const newUser = {
      username: 'johannes',
      name: 'validationERRORtest4',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAfterPost = await helper.usersInDb();

    const names = usersAfterPost.map(user => user.name);
    expect(names).not.toContain('validationERRORtest4');
    expect(usersAfterPost.length).toBe(usersBeforePost.length);
    expect(response.body.error).toBe('password needs to be at least 3 characters long');
  });
});

afterAll(() => {
  mongoose.connection.close();
});