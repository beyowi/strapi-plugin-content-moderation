const subject = `Alumni CSF - Votre contenu a été approuvé`;

const html = `<p>Bonjour,</p><p>Nous vous remercions d’avoir publié sur la plateforme Alumni CSF ! Votre contenu "<%= label %>" a été approuvé et se trouve à présent en ligne.</p><p>Une question ? N’hésitez pas à nous écrire à alumnicsf@cjfcb.com</p><p>À très bientôt,</p><p>L’équipe Alumni CSF</p><a href="https://alumni.csf.bc.ca/">https://alumni.csf.bc.ca/</a>`;

const text = `Bonjour,\n\nNous vous remercions d’avoir publié sur la plateforme Alumni CSF ! Votre contenu \"<%= label %>\" a été approuvé et se trouve à présent en ligne.\n\nUne question ? N’hésitez pas à nous écrire à alumnicsf@cjfcb.com\n\nÀ très bientôt,\nL’équipe Alumni CSF\nhttps://alumni.csf.bc.ca/`;

module.exports = {
  subject,
  text,
  html,
};
