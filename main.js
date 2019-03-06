function getFieldValue(inputField) {
  return inputField.value
}

function addInvalid(inputField, invalidMessage) {
  inputField.classList.add('is-invalid')
  inputField.nextElementSibling.classList.add('invalid-feedback')
  inputField.nextElementSibling.innerHTML = invalidMessage
}

function removeInvalid(inputField) {
  inputField.classList.remove('is-invalid')
  inputField.nextElementSibling.classList.remove('invalid-feedback')
  inputField.classList.add('is-valid')
  inputField.nextElementSibling.classList.add('valid-feedback')
  inputField.nextElementSibling.innerHTML = 'OK!'
}

function removeValid(inputField) {
  inputField.classList.remove('is-valid')
  inputField.nextElementSibling.classList.remove('valid-feedback')
  inputField.nextElementSibling.innerHTML = ''
}

function createCard(data) {
  console.log('pass')
  let newCard = document.createElement('div')
  newCard.classList.add('card', 'clearfix', data.theme)
  let cardContent = `
    <div class="card-left">
      <div class="avatar" style="background-image: url(${data.photoLink})"></div>
    </div>

    <div class="card-right">
      <div class="top clearfix">
        <div class="names">
          <h4>${data.chineseName}</h4>
          <h4>${data.englishName}</h4>
        </div>

         <div class="contact">
          <div class="telephone">
            <i class="fa fa-phone" aria-hidden="true"></i>
            <span>${data.phoneNumber}</span>
          </div>
           <div class="mailbox">
             <i class="fa fa-envelope" aria-hidden="true"></i>
             <span>${data.email}</span>
          </div>
        </div>
      </div>

      <p class="info">${data.info}</p>
    </div>
  `
  newCard.innerHTML = cardContent
  cardPanel.appendChild(newCard)
}

// 選出要放名片的div
const cardPanel = document.querySelector('.col-right')

// 選出表單中的元素
const form = document.forms[0]
const chineseNameField = document.querySelector('#chineseName')
const englishNameField = document.querySelector('#englishName')
const photoLinkField = document.querySelector('#photoLink')
const emailField = document.querySelector('#email')
const phoneNumberField = document.querySelector('#phoneNumber')
const infoField = document.querySelector('#info')

form.addEventListener('submit', function (event) {
  // 防止表單自動送出
  event.preventDefault()

  // 取得每個input的value
  let chineseName = getFieldValue(chineseNameField).trim()
  let englishName = getFieldValue(englishNameField).trim()
  let photoLink = getFieldValue(photoLinkField).trim()
  let email = getFieldValue(emailField).trim()
  let phoneNumber = getFieldValue(phoneNumberField).trim()
  let info = getFieldValue(infoField).trim()
  const theme = document.querySelector('input[name="themeChoice"]:checked').value

  // 若有input不合法，則提醒使用者，並不讓使用者送出
  if (chineseName === '') {
    addInvalid(chineseNameField, '請填入您的中文姓名')
  } else if (englishName === '') {
    addInvalid(englishNameField, '請填入您的英文姓名')
  } else if (email === '') {
    addInvalid(emailField, '請輸入您的email')
  } else if (phoneNumber[0] !== '0' || phoneNumber[1] !== '9' || phoneNumber.length !== 10) {
    addInvalid(phoneNumberField, '手機必須為10碼且前兩碼為09')
  } else if (info.length < 50) {
    addInvalid(infoField, '不可小於50字')
  } else {
    if (photoLink === '') {
      // 沒有填圖片連結就使用預設圖片網址
      photoLink = photoLinkField.placeholder.substring(5)
    }
    // 現階段為靜態，若送出表單( form.submit() )會重新整理，資料會不見

    // 建立一個物件將表單的所有資料傳入函式
    const data = {
      chineseName: chineseName,
      englishName: englishName,
      photoLink: photoLink,
      email: email,
      phoneNumber: phoneNumber,
      info: info,
      theme: theme
    }

    // 建立名片
    createCard(data)

    // 重設表單
    form.reset()

    // 清除提示
    removeValid(chineseNameField)
    removeValid(englishNameField)
    removeValid(emailField)
    removeValid(phoneNumberField)
    removeValid(infoField)
  }

})

form.addEventListener('input', function (event) {
  // 取得觸發input事件的元素及該元素的值
  let inputField = event.target
  let inputValue = inputField.value.trim()

  if (inputField.id === 'chineseName' && inputValue !== '') {
    removeInvalid(inputField)
  }
  if (inputField.id === 'englishName' && inputValue !== '') {
    removeInvalid(inputField)
  }
  if (inputField.id === 'email' && inputValue !== '') {
    removeInvalid(inputField)
  }
  if (inputField.id === 'phoneNumber' && inputValue[0] === '0' && inputValue[1] === '9' && inputValue.length === 10) {
    removeInvalid(inputField)
  }
  if (inputField.id === 'info') {
    let remaining = 200 - inputValue.length
    inputField.parentElement.lastElementChild.innerHTML = `剩餘 ${remaining} 個字`
  }
  if (inputField.id === 'info' && inputValue.length >= 50) {
    removeInvalid(inputField)
  }
})

