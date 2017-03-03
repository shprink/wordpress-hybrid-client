
## Splashscreens and Icons

If you have experienced developing hybrid applications, you know that creating splashscreens and icons is a pain! There are so many parameters that come into play:

* Width and Height
* Density
* OS
* Device
* Landscape / Portrait

If you want to correctly address those parameters you will end up creating a dozen splashscreens and icons per OS. By experience do not even try to do it yourself (e.g using Photoshop), it is a waste of time.

There are some online tools that can help you generating splashscreens and icons but Ionic is also here to help!

### install

```
sudo npm install ionic -g
```

### Create templates

Create two files (either .psd, .ai or .png) within the ```resources``` directory. One named ```icon``` that needs to follow [this template](http://code.ionicframework.com/resources/icon.psd) and the other named ```splash``` that needs to follow [this template](http://code.ionicframework.com/resources/splash.psd)

### Run

```
# generate both icons and splashscreens
ionic resources

# generate only icons
ionic resources --icon

# generate only splashscreens
ionic resources --splash
```

It will upload your files to Ionic’s servers and create everything for you (create the correct platforms folders and even edit the ```config.xml``` file).
