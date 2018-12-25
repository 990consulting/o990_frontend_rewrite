# o990_frontend_rewrite
Creating a proper component architecture and reducing dependencies for the Open990 v2 front end.

Oril implemented the front-end as a procedural React abomination. There are only a few "components," with state shared generously between them. They depended heavily on Redux to track state that isn't even desirable to track, and many of the design decisions resulted in profound render blocking problems. For the most part, it appears that they simply wrote React as if it were JQuery. When they did pull information into separate files, it was on arbitrary axes that violated separation of concerns. 

I have never used React, so I am going to have to rebuild things a bit at a time. So rather than do it in the original repo, I'm pulling the code out to do it here.
