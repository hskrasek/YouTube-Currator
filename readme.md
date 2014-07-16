## YouTube Currator

I have recently ran into the issue where, I have a lot of subscribtions on YouTube that I like to watch on a day-to-day basis. Sadly between work, and YouTube.com's shortcomings, I sometimes miss videos all together, or for a couple of days.

Sadly YouTube has no "official" way to handle this besides Watch Later, which is a bit clunky, and doesnt work if you miss the video to add it to the Watch Later list in the first place.

So I decided that my first project in Node would be to tackle this issue. The plan is that this node script will sit on a server, always running (always watching... always wanting..), doing periodic checks of the YouTube API. Each day it makes a new playlist for that day, something like "Videos for 7/16/2014". From there, it goes through a configured list of subscriptions, and pulls their upload list and compares the video upload dates to the current date. If it matches, it gets added to the playlist. The idea is that this check will run throughout the day adding videos to "Todays Playlist".

This way I have a nice playlist I can turn to either during work if allowed, or on a lunch break, or when I get home, to watch all the videos I want to see. Basically some sort of high tech YouTube DVR type thing.