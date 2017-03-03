
## Naming conventions

There are two types of custom post components. A component that display a list of things, and a component that display a single item.

BOTH MUST FOLLOW THE FOLLOWING NAMING CONVENTION:

List: `<nameOfYouCustomPost-list>` 
Item: `<nameOfYouCustomPost-item>`

For instance if you want to display a list of `movie` then you will need to run the following commands:


## Generate a new Custom Post list

```shell
ionic generate component movie-list --componentsDir ./config/components/
```

## Generate a new Custom Post item

```shell
ionic generate component movie-item --componentsDir ./config/components/
```