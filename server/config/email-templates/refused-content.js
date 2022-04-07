const subject = `Content refused`;

const html = `<h1>Content refused</h1><p>Your <%= contentType %> \"<%= label %>\" has been refused.<p>`;

const text = `Thank you for your contribution!\n\nYour <%= contentType %> \"<%= label %>\" has been refused.`;

module.exports = {
  subject,
  text,
  html,
};
