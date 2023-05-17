const subject = `Alumni CSF - Votre contenu en suspens`;

const html = `<p>Bonjour,</p><p>Nous vous remercions de votre intérêt pour la plateforme Alumni CSF ! Nous avons bien reçu votre demande de publication "<%= label %>". Cependant, il semblerait que des éléments soient manquants ou incorrects pour pouvoir le publier.</p><p>Une question ? N’hésitez pas à nous écrire à alumnicsf@cjfcb.com</p><p>À très bientôt,</p><p>L’équipe Alumni CSF</p><a href="https://alumni.csf.bc.ca/">https://alumni.csf.bc.ca/</a>`;

const text = `Bonjour,\n\nNous vous remercions de votre intérêt pour la plateforme Alumni CSF ! Nous avons bien reçu votre demande de publication \"<%= label %>\". Cependant, il semblerait que des éléments soient manquants ou incorrects pour pouvoir le publier.\n\nUne question ? N’hésitez pas à nous écrire à alumnicsf@cjfcb.com\n\nÀ très bientôt,\nL’équipe Alumni CSF\nhttps://alumni.csf.bc.ca/`;

module.exports = {
  subject,
  text,
  html,
};
