# qul
Qul is command line tool for quering raw & stractured data written in node.js.

## Installation

```bash
$ sudo npm install -g lvrach/qul
```
## NOTE
This is a very early prototype, 
Many things WILL change in the future.
You will find a lot of bugs (please report them).
DO NOT use for anything serious yet. 

## Philosophy
Qul aims to be an easy to use, readable and modern alterative to unix tools, 
by using many modules insted of seperate tools and method chaining instead of pipelining.

It also uses some concepts of SQL (like grouping).

##Modules

###Input modules

Modules that help you import your data. You should start your chain with one of this.
  * file('file_path')  - import data from file in file_path
  * stdin() - read from stdin
  * redis('list_key') - imprort data from a redis list (TODO: sorted list, hash)

###Parsing modules

Helps you parse your raw data in a table format

  * split(delimiter) - split each line by a delimiter (it could be a string or a regex)
  * format(pattern) - extracts fields from a line based on a pattern (see example)
  
###Main modules

  * group(field) - group your data by a specific field
  * sort(field) - order your data by a specific field
  * grep(pattern) - keep only the lines that match a pattern (string or regexp)
  * head(N) - show the N first lines
  * tail(N) - show the N last lines
  * replace(pattern, string) - replace pattern (string or regexp) with an other string

#Example 
 qul get ips with the most request from nginx access logs
 
 ```bash
 qul "file('access.log.1').format('@{ip} -@{e}- [@{date}] \"@{request}\" @{protocol} @{code} \"@{UA}\" \"@{}\"').group('ip').sort('ip_count').tail()"
```
