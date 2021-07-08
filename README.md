# Inner Subtitles
Inner Subtitles is a Javascript collection used to manipulate your subtitles **beyond** what your browser can do. 

> **Installation**

Add the Chosen version and type of Javascript file into your HTML at the **end of the body**

```bash
<script src="innerVtt.js"></script>
```

> Configuration

To start the script,

```bash
    <script>
        _iS({
            file: "fileOfTheSubtitle.vtt  IMPORTANT",
            container: ".containerWhereTheSubtitlesWillDisplay  IMPORTANT", 
            videoSelect: "#YourVideoElement  IMPORTANT",
            custom_element_class: "IfYouWantToStyleYourSubtitles Default is _innerSub",
            display_container: "boolean: true / false. true if you want your container to disapear and reapear according to the cues. default is false"})
    </script>
```

And That's it. VTT stylings are supported.

## Additional Configuration

>CSS file

```bash
    <style>
        .container{
            position: absolute;
            top: 0;
            width: 100%;
            height: 80%;
            left: 50%;
            transform: translate(-50%);
        }
        .video{
            position: relative;
        }
        ._innerSub p{
            margin:0;
            color: white;
            font-size: 30px
        }
        .__innerVTT{
            text-align: center;
            height: fit-content;
            width: fit-content;
            position: absolute;
            transform: translate(-50%, 0); 
            left: 50%;
            top: 100%;
            background: rgba(0, 0, 0, 0.61);
            padding: 5px;
            border-radius: 10px;
        }
    </style>
```
