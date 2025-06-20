# wck-organic-auto-typer
WCK Message Data Collector & Sender | Selfbot MultiToken | v3.0.0

# FEATURES
|- Captures messages from a specific channel  
|- Detects and filters emojis via RegEx  
|- Stores message author and message content using WIO DB  
|- Sends the collected message to another channel with rotating tokens  
|- Auto restarts on unexpected errors  
|- Reconnect logic on shutdown detection  
|- Clean CLI logs with token & message status  

# HOW IT WORKS
1. Reads main token from `getdata.txt` to listen for messages.  
2. Listens to a channel (configured via DB) and checks for messages.  
3. If message is not from a bot and not just emojis, it stores the author ID and message content.  
4. If the next message is from the same user as the last one, it sends the collected message with the current token.  
5. If it's from a different user, it rotates to the next token and sends.  
6. Keeps rotating tokens in a loop using `tokens.txt`.

# WARNINGS
- Token rate-limits are not avoided with advanced delays, only basic 1s intervals. Use with caution.  
- Ensure `getdata.txt` contains a valid token for the message listener client.  
- Do not include bots in `tokens.txt`. Use only valid selfbot tokens.

# WHO AM I?
I made this GitHub project to learn better. It is only for fun. Please do not use it for bad things.
