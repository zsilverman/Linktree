/**
 * Cloudflare Workers project in order
 * to build a linktree-style website
 */
const links = [
{
		"name": "Air Quality Bot", 
		"url": "https://github.com/zsilverman/AirQualityBot"
	},
	{
		"name": "Connect 4 AI", 
		"url": "https://github.com/zsilverman/ConnectFourAI"
	},
	{
		"name": "911 Emergency Address Finder", 
		"url": "https://devpost.com/software/finder-1jqr5z"
	}
]

const social_links = [
	{
		"name": "Linkedin", 
		"url": "https://linkedin.com/in/zacksilverman",
		"svg":"https://simpleicons.org/icons/linkedin.svg"
	},
	{
		"name": "Github", 
		"url": "https://github.com/zsilverman",
		"svg":"https://simpleicons.org/icons/github.svg"
	}
]

class LinksTransformer {
  constructor(links) {
    this.links = links
  }
  
  async element(element) {
    element.setInnerContent(this.links.map(x =>`\t<a href=${x.url}>${x.name}</a>\n`).join(''),{html:true})
  }
}
class ProfileTransformer {  
  async element(element) {
    element.setAttribute("style","")
  }
}
class SocialTransformer {  
	constructor(links) {
    this.links = links
  }

  async element(element) {
  	element.setAttribute("style","")
  	element.setInnerContent(this.links.map(x =>`\t<a href=${x.url}><img src=${x.svg}></a>\n`).join(''),{html:true})
  }
}
class AvatarTransformer {  
  async element(element) {
  	element.setAttribute("src","https://avatars1.githubusercontent.com/u/26322842?s=400&u=29669fbd80805a1e81e5e54ffc38ba1c11ed1980&v=4")
  }
}
class NameTransformer {  
  async element(element) {
  	element.setInnerContent("Zack Silverman")
  }
}
class TitleTransformer {  
  async element(element) {
  	element.setInnerContent("Zack Silverman")
  }
}
class BodyTransformer {  
  async element(element) {
  	element.setAttribute("class","bg-blue-600 bg-opacity-100")
  }
}

async function handleRequest(request) {

  const json = JSON.stringify(links, null, 2)

  if(request.url.includes("links")) {
	  return new Response(json, {
	    headers: {
	      "content-type": "application/json;charset=UTF-8"
	    }
	  })
	}
	else {
		const res = await fetch("https://static-links-page.signalnerve.workers.dev")
		
		return new HTMLRewriter()
			.on("div#links", new LinksTransformer(links))
			.on("div#profile", new ProfileTransformer())
			.on("div#social", new SocialTransformer(social_links))
			.on("img#avatar", new AvatarTransformer())
			.on("h1#name", new NameTransformer())
			.on("title", new TitleTransformer())
			.on("body", new BodyTransformer())
			.transform(res)
	}
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})