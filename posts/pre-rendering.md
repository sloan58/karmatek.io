---
title: 'Two Forms of Pre-rendering'
description: 'This is a test blog post'
date: '2020-01-01'
---

This is a test blog post.

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

```php
$this = "that";
```

```js
let foo = 'bar'
```

```bash
# Config file for collectd(1).
#
# Some plugins need additional configuration and are disabled by default.
# Please read collectd.conf(5) for details.
#
# You should also read /usr/share/doc/collectd-core/README.Debian.plugins
# before enabling any more plugins.
##############################################################################
# Global                                                                     #
#----------------------------------------------------------------------------#
# Global settings for the daemon.                                            #
##############################################################################
#Hostname "localhost"
FQDNLookup false
#BaseDir "/var/lib/collectd"
#PluginDir "/usr/lib/collectd"
#TypesDB "/usr/share/collectd/types.db" "/etc/collectd/my_types.db"
#----------------------------------------------------------------------------#
# When enabled, plugins are loaded automatically with the default options    #
# when an appropriate <Plugin ...> block is encountered.                     #
# Disabled by default.                                                       #
#----------------------------------------------------------------------------#
#AutoLoadPlugin false
#----------------------------------------------------------------------------#
# When enabled, internal statistics are collected, using "collectd" as the   #
# plugin name.                                                               #
# Disabled by default.                                                       #
#----------------------------------------------------------------------------#
#CollectInternalStats false
#----------------------------------------------------------------------------#
# Interval at which to query values. This may be overwritten on a per-plugin #
# base by using the 'Interval' option of the LoadPlugin block:               #
#   <LoadPlugin foo>                                                         #
#       Interval 60                                                          #
#   </LoadPlugin>                                                            #
#----------------------------------------------------------------------------#
#Interval 10
#MaxReadInterval 86400
#Timeout         2
#ReadThreads     5
#WriteThreads    5
# Limit the size of the write queue. Default is no limit. Setting up a limit
# is recommended for servers handling a high volume of traffic.
#WriteQueueLimitHigh 1000000
#WriteQueueLimitLow   800000
##############################################################################
# Logging                                                                    #
#----------------------------------------------------------------------------#
# Plugins which provide logging functions should be loaded first, so log     #
# messages generated when loading or configuring other plugins can be        #
# accessed.                                                                  #
##############################################################################
LoadPlugin logfile
<Plugin "logfile">
  LogLevel "info"
  File "/var/log/collectd.log"
  Timestamp true
</Plugin>
##############################################################################
# LoadPlugin section                                                         #
#----------------------------------------------------------------------------#
# Specify what features to activate.                                         #
##############################################################################
LoadPlugin "network"
LoadPlugin "csv"
<LoadPlugin "write_splunk">
    FlushInterval 30
</LoadPlugin>
##############################################################################
# Plugin configuration                                                       #
#----------------------------------------------------------------------------#
# In this section configuration stubs for each plugin are provided. A desc-  #
# ription of those options is available in the collectd.conf(5) manual page. #
##############################################################################
<Plugin "csv">
  DataDir "/var/lib/collectd/csv"
  StoreRates true
</Plugin>
<Plugin "network">
  Listen "10.175.100.75" "25826"
</Plugin>
<Plugin write_splunk>
    server "10.175.100.75"
    port "8088"
    token "bccf71e4-2f98-45c0-986d-9d83389d66e2"
    ssl true
    verifyssl false
</Plugin>
<Include "/etc/collectd/collectd.conf.d">
	Filter "*.conf"
</Include>
```
