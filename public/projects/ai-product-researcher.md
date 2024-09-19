# AI product researcher
## Why
I was planning to buy a laptop and had just started to look for one that fit my criteria. It had to be at least 15
	inches, 16 gigs of ram and relatively light since I mostly would use it while travelling. I also didn’t want to
	spend more than $1000 on it since it probably wouldn’t have to do anything more resource intensive than opening a
	chrome tab.

I started googling and compiling a table of possible laptops that included their price, link and specs. However, soon
	this became repetitive and I started to wonder if AI can’t just do this for me? First, I tried just asking ChatGPT
	to google for and compile a list of laptop that fit my requirements but it turned out to be a little too hard. Not
	one of the laptops listed fit all my criteria and many of the links it provided were straight up broken or went to
	404 pages.

Next I tried using perplexity, it is after all built for research. It performed a little better and gave me more
	alternatives, but still, very few of them fit my criteria and there were still a lot of broken links. There had to
	be a way to do this better.

## How
This is why I developed airesearcher.duckdns.org, an AI powered service specialized in finding finding you
	products that fit your specified criteria. It works like this:

You start, as with any app, by logging in or creating an account. The app is built with dotnet and handles users with
	dotnet Identity which in turn is connected to my Azure SQL server database. Upon registering in you are prompted to
	create a new conversation. You need to tell the AI what kind of product you want to research, what your requirements
	are and what datapoints you want it to gather for each product. In my case i set the product to laptop, the
	instructions to “At least 15 inch display, under $1000 and as light as possible”, and added the data-points display,
	weight, ram, storage, gpu and cpu.

![image of new conversation view!](images/new-conversation-small.png)

When clicking the “Create conversation” button the AI, powered by the GPT-4 mini API starts to work. It perform
	actions which include: googling and browsing websites by controlling a browser and starting “sub agents” for
	specific tasks. The sub-agents can do the tasks of summarizing pages, researching a specific product model and
	adding products to the table. The reason I had to divide the work into smaller pieces was that the main agent
	quickly would get lost and forget it’s instructions as soon as the input size grew too much. Another bonus with this
	approach was that it allowed the agents to work in parallell and therefore go quite a bit quicker.

You, the user, gets immediate feedback via dotnets signal-R, a tool built on top of web sockets and server send
	events). You get to see what actions the AI is performing, it’s explanation of what it’s doing and what products it
	has added to the table.

![image of normal view!](images/normal.png)

## The result
After letting the AI run for a while you can pause it and examine the table of products it has provided. The program
	works decently but is limited by one two main factors, the first one being the models stupidity and inability to
	follow instructions. I mostly used gpt-4o-mini for most of development and production of this app since it’s over
	30x cheaper than regular gpt-4o but this did come at a cost. It makes a decent amount of mistakes and has a hard
	time trying to follow instructions when too much information is given. This issue is lessened by dividing the tasks
	up between models but it doesn’t completely fix it.

The second limitation lies in the fact that websites are primarily built for humans. Even though we can scrape the
	content of a website it’s currently not possible for the AI to press buttons and interact with it the same way a
	human would. This limits us when for example choosing options for a product with different configurations (for
	example a laptop where you can choose the amount of ram and storage).

I started hosting it on azure but with a free plan it became incredibly slow due to the performance required to run a 
    headless browser. I ended up self howting it on an old laptop instead which became about 4x faster.

You can try out the app here: [https://airesearcher.duckdns.org](https://airesearcher.duckdns.org)
