const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'Asiaa voisarvista',
    author: 'Jacques Buttah',
    url: 'www.croissant.fr',
    likes: 1
  },
  {
    title: 'Moi',
    author: 'Moikkaaja Pete',
    url: 'petellaonasiaa.org',
    likes: 12
  }
];

const initialUsers = [
  {
    username: 'testaaja',
    name: 'kalervo kummola',
    passwordHash: '$2b$10$71p5atDYuM6AmdFc8FmIseEP3anRGVgUnOBJnmgFU6aEMUlL8WsyG'
  }
];

const nonExistingId = async () => {
  const blog = new Blog(
    {
      title: 'randomTitle',
      author: 'randomAuthor',
      url: 'www.fi',
      likes: 2
    });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
};