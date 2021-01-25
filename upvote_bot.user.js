// ==UserScript==
// @name         Upvote Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       MaazaMaaza
// @match        https://www.reddit.com/r/shoppingbay/
// @grant        none
// ==/UserScript==

let my_accounts=['u/HarlemShakespeare','u/MaazaMaaza']
// posts=document.querySelectorAll('._1oQyIsiPHYt6nx7VOmd1sz') //enable for manual interaction
let author= (post) => post.querySelector('._2tbHP6ZydRpjI44J3syuqC._23wugcdiaj44hdfugIAlnX.oQctV4n0yUb0uiHDdGnmE')
let title= (post) => post.querySelector('._eYtD2XCVieq6emjKBH3m')
let score= (post) => post.querySelector('._1rZYMD_4xY3gRcSS3p8ODO').textContent
function upvote(post){
	let upvoteButton=post.querySelectorAll('.voteButton')[0]
	if(upvoteButton.querySelector('span').classList.contains('_3edNsMs0PNfyQYofMNVhsG')) { //not already upvoted
		upvoteButton.click();
		console.log('Upvoted!')
	}
	else console.log('Already upvoted')	
}
function downvote(post){
	let downvoteButton=post.querySelectorAll('.voteButton')[1]
	if(downvoteButton.querySelector('span').classList.contains('_3yQIOwaIuF6gn8db96Gu7y')) { //not already downvoted
		downvoteButton.click();
		console.log('Downvoted!')
	}
	else console.log('Already downvoted')	
}
let randint = (a,b) => Math.floor(Math.random()*(b-a+1)+a)

function printPost(post){
	console.log(author(post).textContent)
	console.log(title(post).textContent)
	console.log(Number(score(post)))
}

function upvoteBot(i,n){
	setTimeout(function() {
		console.log(`Post ${i}`)
		let posts=document.querySelectorAll('._1oQyIsiPHYt6nx7VOmd1sz')
		if(i>0) posts[i-1].scrollIntoView()
		let post=posts[i]
		let post_score=Number(score(post))
		printPost(post)
		title(post).textContent=`${i}> ${title(post).textContent}`
		if(my_accounts.includes(author(post).textContent)) {
			upvote(post)
		}
		else if(post_score){
			if(post_score>2){
				downvote(post)
			}
			else{
				upvote(post)
			}
		}
		else if(score(post)==='Vote'){ //score shows 'Vote'
			console.log('New post, not voting')
		}
		else{ //score more than 1k
			console.log('Score more than 1k')
			downvote(post)
		}
		i++
		if(i<n) upvoteBot(i,n)
	},randint(3,4)*1000)
}

window.addEventListener('load',function(){
	upvoteBot(0,25)
	alert('Done voting :)')
})
