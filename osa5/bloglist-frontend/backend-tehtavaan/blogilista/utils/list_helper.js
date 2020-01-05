const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const reducer = (acc, cur) => {
    return acc + cur.likes;
  };
  return blogs.reduce(reducer, 0 );
};

const favoriteBlog = blogs => {

  if (blogs.length === 0) return null;

  let mostLikes = blogs
    .map(blog => blog.likes)
    .reduce((acc, cur) => {
      return Math.max(acc, cur);
    }, -1);

  const returnedBlog = blogs.find(blog => blog.likes === mostLikes);

  return ({
    title: returnedBlog.title,
    author: returnedBlog.author,
    likes: returnedBlog.likes
  });
};

const mostBlogs = blogs => {

  if (blogs.length === 0) return null;

  const mappedAuthors = new Map();
  blogs.forEach(blog => {
    if (!mappedAuthors.get(blog.author)) {
      mappedAuthors.set(blog.author, 1);
    } else {
      let currentValue = mappedAuthors.get(blog.author);
      mappedAuthors.set(blog.author, currentValue+1);
    }
  });

  let result = {};
  let mostBlogsWritten = 0;

  mappedAuthors.forEach((value, key) => {
    if (value > mostBlogsWritten) {
      result.author = key;
      result.blogs = value;
      mostBlogsWritten = value;
    }
  });

  return result;

};

const mostLikes = blogs => {
  if (blogs.length === 0) return null;

  const mappedAuthors = new Map();
  blogs.forEach(blog => {
    if (!mappedAuthors.get(blog.author)) {
      mappedAuthors.set(blog.author, blog.likes);
    } else {
      let currentValue = mappedAuthors.get(blog.author);
      mappedAuthors.set(blog.author, currentValue + blog.likes);
    }
  });

  let result = {};
  let mostLikesReceived = -1;

  mappedAuthors.forEach((value, key) => {
    if (value > mostLikesReceived) {
      result.author = key;
      result.likes = value;
      mostLikesReceived = value;
    }
  });

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};