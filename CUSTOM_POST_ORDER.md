
## Custom Post-Order

When a user chooses a category to view, he gets a list of all the posts in that category, from newest to oldest.
Sometime this is not enough, and you want to controll the order of posts, regardless of creation time.
If this is the case - follow the instructions bellow.

### Install a custom post-order plugin on your WordPress site

1. Go to my branch of intuitive-custom-post-order:
[https://github.com/pinkasey/intuitive-custom-post-order](https://github.com/pinkasey/intuitive-custom-post-order)
and download it as zip-file. Or simply click [this link](https://github.com/pinkasey/intuitive-custom-post-order/archive/master.zip) to download it.

2. Go to your WordPress admin page and install the plugin from the zip-file you have just downloaded

3. Go Settings -> Intuitive CPO and mark the checkbox next to 'Posts'

### Setting up your application to sort posts by 'menu_order'

open 'config.cson' and paste these lines:
```
"taxonomies":
    "posts":
        "query":
            "orderby" : "menu_order"
            "order": "asc"

```

That's it!
From now on, when choosing a category, posts whithin this category will be ordered by the order you chose using 'intuitive-custom-post-order'


#### A few words about custom post-order WordPress-plugins:

There are many custom post-order WordPress-plugins that let you rearrange your posts with a drag-and-drop interface,
Most work well and do exactly the same.
Sadly, none of them (of which I've checked) integrates well with wp-api.
To Overcome it I've choose one of these plugins - [intuitive-custom-post-order](https://github.com/hijiriworld/intuitive-custom-post-order/) - and made a small change to it.
I'm still waiting for the author to accept [my pull-request](https://github.com/hijiriworld/intuitive-custom-post-order/pull/14)
If it serves you, you are welcome to see the change that I've made in my pull-request and copy it to any other plugin.
