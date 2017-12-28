<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{title}}</title>
    <style>
        body{
            margin:0;
            padding:20px;
        }
        ul{
            margin:0;
            padding-left:20px;
        }
        a{  
            display:inline-block;
            font-size:16px;
            line-height:30px;
            text-decoration:none;
        }
    </style>
</head>
<body>
    <!-- 此处注意handlebars模板的一个特点，这里接收的dir与files处于同一级，
        所以要想正确使用dir，需要先使用../回到上一级再使用 -->
    <ul>
        {{#each files}}
          <li><a href="{{../dir}}/{{this}}">{{this}}</a></li>  
        {{/each}}
    </ul>

</body>
</html>
