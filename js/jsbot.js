class TelegramBotSetup {
  constructor(token) {
    this.token = token;
    this.requestUrl = 'https://api.telegram.org/bot';
  }

  api(type, method, body) {
    return new Promise((resolve, reject) => {
      fetch(this.requestUrl + this.token + type, {
        method: method,
        body: body
      }).then(res => {
        resolve(res.json())
      }).catch(err => {
        reject(err)
      })
    })
  }
}

class Bot extends TelegramBotSetup {
  constructor(botToken, defaultChatID) {
    super(botToken);
    this.dcid = defaultChatID;
  }

  static start() {

  }

  async getUpdates() {
    try {
      const result = await this.api('/getUpdates', 'GET')
      return await result
    } catch(e) {
      return await e
    }
  }

  async getMe() {
    try {
      const result = await this.api('/getMe', 'GET')
      return await result
    } catch(e) {
      return await e
    }
  }

  async sendMessage(text, chatID, parseMode, disableNotification) {
    try {
      const result = await this.api(`/sendMessage?text=${text}&chat_id=${chatID ? chatID : this.dcid}&parse_mode=${parseMode ? parseMode : 'html'}&disable_notification=${disableNotification ? disableNotification : false}`, 'GET')
      return await result
    } catch(e) {
      return await e
    }
  }

  async sendPhoto(img, caption, chatID, parseMode, disableNotification) {
    try {
      if (img.startsWith('#')) {
        const file = document.getElementById(img.replace('#', ''));
        const formData = new FormData();
        formData.append("photo", file.files[0])
        const result = await this.api(`/sendPhoto?caption=${caption ? caption : ''}&chat_id=${chatID ? chatID : this.dcid}&parse_mode=${parseMode ? parseMode : 'html'}&disable_notification=${disableNotification ? disableNotification : false}`, 
          'POST', formData)
        return await result
      }
      else if (typeof img === 'string') {
        const result = await this.api(`/sendPhoto?photo=${img}&caption=${caption ? caption : ''}&chat_id=${chatID ? chatID : this.dcid}&parse_mode=${parseMode ? parseMode : 'html'}&disable_notification=${disableNotification ? disableNotification : false}`, 'GET')
        return await result
      }
    } catch(e) {
      return await e
    }
  }
  async sendFile(doc, caption, parseMode, chatID, disableNotification) {
    try {
      if (doc.startsWith('#')) {
        const file = document.getElementById(doc.replace('#', ''));
        const formData = new FormData();
        formData.append("document", file.files[0])
        const result = await this.api(`/sendDocument?caption=${caption ? caption : ''}&chat_id=${chatID ? chatID : this.dcid}&parse_mode=${parseMode ? parseMode : 'html'}&disable_notification=${disableNotification ? disableNotification : false}`, 
          'POST', formData)
        return await result
      }
      else if (typeof doc === 'string') {
        const result = await this.api(`/sendDocument?document=${doc}&caption=${caption ? caption : ''}&chat_id=${chatID ? chatID : this.dcid}&parse_mode=${parseMode ? parseMode : 'html'}&disable_notification=${disableNotification ? disableNotification : false}`, 'GET')
        return await result
      }
    } catch(e) {
      return await e
    }
  }

}

Bot.start()