const router = require('express').Router()
const Nightmare = require('nightmare')
//const io = require('socket.io')(server);

require('nightmare-upload')(Nightmare)

const nightmare = Nightmare({show: true})

var _postTitle = 'GTA 총판영업및일반회원모집중'
var _websiteName = 'GTA'
var _websiteAddress = 'http://gta369.com'
var _attachmentFile = "E:\/Downloads\/LS\/"
var _postMessages = `안녕하십니까 본사 영업팀 담당 홍부장입니다.

요즘들어 제대로된 사이트 하나 찾기 힘들어 총판 영업에 어려움이 많으실거라

생각합니다. 예전과는 달리 요즘은 작업,api,양방,밀기 등 일반적으로

많은 작업사무실이 생기면서 사이트들이 어려워져 먹튀나 자본 부족으로

갑자기 사라지거나 많은 문제점들이 있습니다.

저희본사 역시 이러한 문제점들을 해결해나가며 최상위 안전한

사이트가 되도록 모든 운영진들이 계속 노력하고있으며 이용하시는데 있어

불편함이 없도록 맞춤 시스템으로 바뀌어 운영되고있습니다.

하지만 이러한 노력에도 총판 및 회원들이 없으면 당연히 운영하기란 쉽지 않습니다.

저희를 믿고 저희본사에서 뼈묻고 계시는 총판,회원 여러분들이 계시기에

이처럼 안전하게 꾸준히 유지되어 오고 있습니다.

이에 저희 본사에서는 한걸음더 더욱더 큰 메이저로 거듭나고자 총판 및 회원님들을

대거 영입하자는 본사의 회의결과가 나와 대대적인 영입을 시작하게되었습니다.


1)우선 커미션의 대한 부분은 죽장(30~40%) 첫 40%~50% 절대 믿지 마십시요 99%먹튀입니다.

롤링 1.8% (추가 수익에 대한 %를 본사에서 따로 지급해드립니다.)

2)회원관리 총판분들께서는 회원 영입에만 집중하실수 있도록 본사에서

일일이 회원님들에게 TM및 이용관리를 해드립니다.

3)저희 본사는 1년 365일 매일 24시간 꾸준히 운영되고있습니다. 언제든지 문의하시어

불편한점이나 개선되야할점 이벤트등 문의하시면 본사에서는 적극 검토하여

적용될수있도록 하겠습니다.(저희본사의 주인은 회원님들이라는 마인드로 운영하고있습니다.)

**해외 스포츠 및 실시간 게임등 현존하는 모든게임은 업뎃 예정이며 이용상황에 따라

조기 마감 또는 계속 유지될수있습니다.

일일이 모든 설명을 글로 말씀드리기 어렵습니다. 우선 연락주시면 상담을통해 자세하게

말씀드리고 진행하시는데 어려움 없으시도록 하겠습니다.

카톡문의:gta365 가입코드: king`
var _isTimerStart = false;
var _btnStartContent;
var _isStartDisabled;
var _isStopDisabled;

router.get('/', (req, res) =>  {
  res.render('main', {
    postTitle: _postTitle,
    websiteName: _websiteName,
    websiteAddress: _websiteAddress,
    postMessages: _postMessages,
    attachmentFile: _attachmentFile,
    btnStartContent: "Start",
    isStartDisabled: "",
    isStopDisabled: "disabled",
    isTimerStart: "initialCountDownTimer(" + _isTimerStart + ")"
  })
})

router.post('/', (req, res) =>  {
    _postTitle = req.body.postTitle
    _websiteName = req.body.websiteName
    _websiteAddress = req.body.websiteAddress
    _postMessages = req.body.postMessages

    if (req.body.stop == null) {

      if (req.body.attachmentFile == '') {
        _attachmentFile = _attachmentFile + 'eoxtwcq.jpg'
      }
      else {
        _attachmentFile = _attachmentFile + req.body.attachmentFile
      }

      console.log(_attachmentFile)

      _btnStartContent = "Processing.."
      _isStartDisabled = "disabled"
      _isStopDisabled = ""

      startPosting()
    }
    else {
      _btnStartContent = "Start"
      _isStartDisabled = ""
      _isStopDisabled = "disabled"

      process.exit()
    }

    fetchViewData(res, false)
    setPostInterval(res)
})

function fetchViewData(res) {

  res.render('main', {
    postTitle: _postTitle,
    websiteName: _websiteName,
    websiteAddress: _websiteAddress,
    postMessages: _postMessages,
    attachmentFile: _attachmentFile,
    btnStartContent: _btnStartContent,
    isStartDisabled: _isStartDisabled,
    isStopDisabled: _isStopDisabled,
    isTimerStart: "initialCountDownTimer(" + _isTimerStart + ")"
  })

}

function setPostInterval(res) {

    for (var i = 1; i < 1; i++) {
      fetchViewData(res)
    }

}

function startPosting() {
  nightmare
  	.goto('https://www.totomarket.net/')
  	.wait('.formGPE_login')
  	.type('.formGPE_login input[name=user_id]', 'gta369')
  	.type('.formGPE_login input[name=password]', 'qwas1122')
    .click('.formGPE_login input[type=submit]')
  	.wait('.userName')
  	.evaluate(() => {
  		let length = document.querySelectorAll('.userName').length
  		return length
  	})
  	.then((loggedPageData) => {
  		if (loggedPageData > 0) {
  			nightmare
  				.goto('https://www.totomarket.net/ad')
  				.wait(2000)

  				.evaluate(() => {
  					let length = document.querySelectorAll('.fr').length
  					return length
  				})
  				.then((promotionPageData) => {

  					if (promotionPageData > 0) {
              nightmare
                .goto('https://www.totomarket.net/index.php?mid=ad&act=dispBoardWrite')
                .wait('#postTitle')
                .type('#postTitle', _postTitle)
                .type('input[name=extra_vars1]', _websiteName)
                .type('input[name=extra_vars2]', _websiteAddress)
                .wait('#cke_1_contents')
                .upload('#xe-fileupload', _attachmentFile)
                .wait(5000)
                .evaluate((postMessages) => {
                  document.querySelector('#cke_1_contents iframe').contentWindow.document.body.querySelector('p').innerHTML =  '<p>' + postMessages.replace(/\n{2,}/g, "</p><p>").replace(/\n/g, "<br>") + '</p>'
                  // document.querySelector('.regist input[type=submit]').click()
                }, _postMessages)
                .goto('https://www.totomarket.net/index.php?mid=ad&document_srl=1989069')
                .wait('.np_18px')
                .evaluate(() => {
                  let length = document.querySelectorAll('.np_18px').length
                  return length
                })
                .then((postedPage) => {
                  if (postedPage > 0) {
                    doPostData(nightmare)
                  }
                })
                .catch(err => {
                  doPostData(nightmare)
                  console.log(err)
                })

              function doPostData(nightmare) {
                return nightmare
                        .then(() => {
                          _isTimerStart = true
                        })
                        .wait(1800000)
                        .then(() => {
                          _isTimerStart = false
                        })
                        .goto('https://www.totomarket.net/index.php?mid=ad&act=dispBoardWrite')
                        .wait('#postTitle')
                        .type('#postTitle', _postTitle)
                        .type('input[name=extra_vars1]', _websiteName)
                        .type('input[name=extra_vars2]', _websiteAddress)
                        .wait('#cke_1_contents')
                        .upload('#xe-fileupload', _attachmentFile)
                        .wait(5000)
                        .evaluate((postMessages) => {
                          document.querySelector('#cke_1_contents iframe').contentWindow.document.body.querySelector('p').innerHTML = '<p>' + postMessages.replace(/\n{2,}/g, "</p><p>").replace(/\n/g, "<br>") + '</p>'
                          // document.querySelector('.regist input[type=submit]').click()
                        }, _postMessages)
                        .goto('https://www.totomarket.net/index.php?mid=ad&document_srl=1989069')
                        .wait('.np_18px')
                        .evaluate(() => {
                          let length = document.querySelectorAll('.np_18px').length
                          return length
                        })
                        .then((postedPage) => {
                          if (postedPage > 0) {
                            doPostData(nightmare)
                          }
                        })
                        .catch(err => {
                          console.log(err)
                          doPostData(nightmare)
                        })
              }

  					}
  				})
  				.catch(err => {
  					console.log(err)
  				})
  		} else {
  			console.log('Username and password is invalid.')
  		}

	})
	.catch(err => {
		console.log(err)
	})
}

module.exports = router
