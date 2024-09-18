# LLM RAG Chat

This is a webapp built with python and react native. It works like this:

You start by logging in and inputing a list of urls you want the AI to index. The app will scrape those urls and add
them to a FAISS vector database. You can then chat with an LLM about the content of these websites using RAG-search.
This can be useful when the AI is not yet trained on some documentation or some other data you don't have the time
to read yourself.

You can find the app here: [https://chat.firefrogstudio.se](https://chat.firefrogstudio.se)
