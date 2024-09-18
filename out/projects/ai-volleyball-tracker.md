# AI volleyball tracker

Since this is the project I’m currently working on and the one most relevant to this job I thought I’d share a
	little about it here. I’m currently building an AI application that will generate statistics on how you
	performed in your beach volleyball game based on just a video. Here’s how it works and where I am so far:

First, the program uses YOLO to detect all the people in each frame of the video. For each detection, it
	generates an embedding using a custom TensorFlow model I've trained. This embedding is designed to
	capture recognizable characteristics like body shape, hair color, and clothing, allowing the program to
	identify the same player across different frames.

![volleyball image!](images/volleyball.png)

The model uses a modified version of the MobileNet architecture, trained on a large number of images of a
	specific set of people. By removing the classification layer, the model is transformed into an embedding
	model, which outputs embeddings that represent features rather than specific classifications, making it
	capable of identifying any person (not just the ones used in training). While training the model I also used
	data augmentation techniques like brightness adjustment, rotation and zoom to artificially expand my
	training set size.

Once the embeddings are generated, they are added to a vector database representing each player. To
	determine which detection corresponds to which player, I implemented an algorithm that compares each
	detection’s position and embedding to the players previous embeddings and positions.

To detect the ball I initially used YOLO’s pretrained model for “sports balls”, but it only detected the ball in a
	fraction of the frames. Luckily it was quite easy to fine-tune the YOLO model on a custom dataset. I started
	off by having the pretrained model generate data for me. Something that actually worked better than
	expected. However, this only gave some more data and mostly for the frames where it was easier to find the
	ball. So, I supplemented this data with some open source datasets and also manually labeled some data
	which significantly improved performance.
