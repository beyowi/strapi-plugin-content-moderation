const subject = `Content approved`;

const html = `<h1>Content approved</h1><p>Your <%= contentType %> \"<%= label %>\" has been approved.<p>`;

const text = `Thank you for your contribution!\n\nYour <%= contentType %> \"<%= label %>\" has been approved.`;

module.exports = {
  subject,
  text,
  html,
};
