###OfficeCommander!###

... ok, so maybe that title is a little overblown for what this is -- just a **quick demo that uses Microsoft's new Office 365 REST Graph API, oAuth2, and Node.js to show your last ten Office 365 emails** -- but that's the name it began with and now that's the title it's gonna have. This project began as a 24 hour hackathon project for my employer, GoDaddy, in which we were going to create a little Chrome extension, so when you open a new tab, all your important Office 365 docs and contacts and whatnot are all there right at the ready.

Sadly, our beautiful dream was not to be realized. Not that night anyway. We figured it would be super simple to hook up to the API and just get going and when you look at the code, you're going to be like, "Duh." That said, there was a surprising amount of pain in getting to this point, lots of little dumb things to sort out, examples to try, modify and discard, none of which worked quite right for the new Office 365 Graph API. This is my contribution to the pile. For the next person with an interest in OAuth / Node / Office 365 REST calls, hopefully you'll find this useful as a starting point rather than getting stuck in setup hell.

###30 Second Demo###
* git clone this repo
* npm install
* node server.js
* go http://127.0.0.1:3000

###The Microsoft Graph API###
... aka **The Office 365 Unified REST API**. This example uses the <a href="https://msdn.microsoft.com/office/office365/HowTo/platform-development-preview-features-overview">new Office 365 Graph API</a> to grab email, which [behaves a little differently than the "main" api](https://msdn.microsoft.com/en-us/office/office365/howto/examples-of-office-365-unified-api-calls). That is to say, the endpoint in this example is: https://graph.microsoft.com

... so... uhh... enjoy that. 

In all seriousness, the Graph API is theoretical future of the Office 365 APIs, so it's probably worth exploring this now, if you're into that kind of thing. Which I know you are.

For demonstration purposes, I set up my Microsoft Azure Active Directory with the proper permissions to show you how this works. You'll go to the web page, log in via your Office 365 account, and see your mail. When you authenticate, you'll note that this app's Active Directory instance has been granted a single permission: read Office 365 email. When you're working on your own project, you'll need to set up your own AD instance and change those key and client settings.

###Lessons Learned###
* **The client must consent**. Any OAuth Client you're going to use HAS to allow for "prompt=consent" if you want to connect to Microsoft's newer API. If you don't properly get consent from the user on login and fully inform them of the privledges you're grabbing, you won't be able to make subsequent successful calls to the Graph REST API. 
* **Some tokens are lies**. Sometimes, the Azure Active Directory system will give you a token that'll authenticate you, but not allow you to read email. The token looks valid -- throw it into the token decoder at http://jwt.calebb.net, you'll see that it decodes correctly -- however, it just doesn't work. If it's missing an "oid" property, you messed up somewhere in the setup of your Active Directory or authentication.
* **Requests to the graph API are VERY particular**. Don't forget the "?api-version=1.5" at the end of your calls!
* **You'll need a Microsoft Azure account**. At least, if you want to go further than what this example allows. I've left my sample keys and whatnot in place for now, but literally the only thing it allows is reading email. To set up an Active Directory instance for your app to use, [follow these directions and create a new Active Directory instance](https://msdn.microsoft.com/en-us/office/office365/howto/add-common-consent-manually).
  * **Active Directory Settings**
    * SIGN-ON URL: http://127.0.0.1:3000/login
    * REPLY URL: http://127.0.0.1:3000/auth/azureoauth/callback/
    * APPLICATION IS MULTI-TENANT: YES
* **Be VERY careful about adding "Windows Azure Active Directory" permissions**. You're not gonna need 'em, not for hitting O365 and getting email / files / contacts / whatever. That's actually one of the places I got tripped up: we use Office 365 at work and our domain is locked down in such a way that it doesn't allow random applications to connect to it. Makes sense, but it wasn't super obvious initially why my OAuth attempts kept failing. As you're adding new Office 365 permissions, you'll find [this document](https://msdn.microsoft.com/office/office365/HowTo/application-manifest) helpful.
* **Most of the other tutorials out there are for the old Office 365 / Exchange API**. The new Office 365 REST Graph API behaves somewhat differently. Those other examples are useless. Forget you ever saw them. They will only lead you astray.
* **The REST API documentation isn't bad, once you get a feel for it.** Microsoft has pretty good description of the whole OAuth process [here](https://msdn.microsoft.com/en-us/library/azure/Dn645542.aspx) and there's [a unified api overview](https://msdn.microsoft.com/en-us/office/office365/howto/office-365-unified-api-overview) that's worth reading. [These example Office 365 Unified API call examples](https://msdn.microsoft.com/en-us/office/office365/howto/examples-of-office-365-unified-api-calls) might be worth a look as well.
* **You'll need a valid Office 365 account for this to work.** Hopefully that goes without saying?

## Contact
Jon Roig [@runnr_az](https://twitter.com/runnr_az)


## License

[MIT](https://github.com/andrewkeig/joi-contrib/blob/master/LICENSE)
