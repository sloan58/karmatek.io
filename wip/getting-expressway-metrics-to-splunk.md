---
title: 'Getting Expressway metrics to Splunk'
description: 'Configuring a collectd receiver for Expressway metrics'
date: '2020-12-16'
---

##### This post is a follow up to my post about [how to store Expressway collectd metrics](https://www.karmatek.io/posts/collecting-expressway-metrics).

In the first post we configured the Expressway to send collectd metrics to an Ubuntu host that is running a collectd receiver. Now, we'll setup an integration to send those metrics to Splunk.

The directions below are how I was able to set this up. I'm learning my way around Splunk so there might be a better way to do this, but this is what worked for me.

---

1. Install Splunk App for Infrastructure

Go to your Apps interface

![image info](/images/splunk_find_more_apps.png)

Install the Splunk App of Infrastructure. Mine says "Update" because it's already installed. Yours will be a green "Instal" button if it's not there already.

![image info](/images/splunk_add_ons.png)

Now that your App is installed, you can download the collecd plugin from there. But first, let's create an input for our collectd data.

2. Create the collectd input in Splunk (with HEC token)

Go to the Splunk Settings and Data Inputs interface.

![image info](/images/splunk_settings.png)

Click to add a new HTTP Event Collector.

![image info](/images/splunk_new_hec.png)

3. Download the `write_splunk` plugin

First we need to download the `write_splunk` collectd plugin from the Splunk server. This plugin will get loaded in the collectd configuration, and point to Splunk with an API token.

After you've logged in to your collectd receiever, switch to the root user (`sudo su -`) and run the following command to grab the plugin.

```bash
wget https://<YOUR.SPLUNK.IP.ADDRESS>:8000/en-US/static/app/splunk_app_infrastructure/unix_agent/unix-agent.tgz --no-check-certificate
```

After the plugin is downloaded, you'll need to untar it.

```bash
tar xvzf unix-agent.tgz
```

The tar file comes with support for a couple different version of collectd. I was using 5.7 in my setup, but check the folder if you need a different version for yours.

Copy your plugin into the collectd plugins folder.

```bash
cp unix-agent/plugin_5_7_5_8/deb_libcurl4/write_splunk.so /usr/lib/collectd/
```

3. Configure collectd with write_splunk

After you have the Ubuntu server ready to go, you'll need to install the `collectd` package.

```bash
sudo su -
apt-get -y update
apt-get install -y collectd
```

The collectd installation will place a configuration file in `/etc/collectd/collectd.conf`. This file has a lot of great comments and sensible defaults, but I've provided a config file below that you can use to set things up for Expressway quickly.

In this case, we configure collectd to listen on the network for incoming data from the Expressway and we output it to .csv files.

3. Configure collectd

Use the config file below, updating the setting for your IP address.

```bash
cp /etc/collectd/collectd.conf /etc/collectd/collectd.conf.bak
rm /etc/collectd/collectd.conf
vim /etc/collectd/collectd.conf
```

Paste the following into the config file after changing the listen IP address.

```bash
# The logfile plugin will log interesting data about collectd
LoadPlugin logfile

# The network plugin will listen on an interface for incoming collectd information
LoadPlugin network

# The csv plugin wil write the output to .csv files in the configured directory.
LoadPlugin csv

<Plugin "logfile">
	LogLevel "info"
	File "/var/log/collectd.log"
	Timestamp true
</Plugin>

<Plugin "csv">
	DataDir "/var/lib/collectd/csv"
	StoreRates true
</Plugin>

<Plugin "network">
	Listen "<YOUR_UBUNTU_IP>" "25826"
</Plugin>


<Include "/etc/collectd/collectd.conf.d">
	Filter "*.conf"
</Include>
```

If you check the original collectd conf file it has a lot more than this one. I trimmed everything down so that it's easy for me to understand at a glance.

4. Restart collectd

```bash
systemctl restart collectd
systemctl status collectd
```

collectd should be listed as `active (running)`. If it's not, check your log file (`/var/log/collectd.log`) and restart collectd.

5. Configure the Expressway to point over to your new collectd receiver.

Log into your Expressway system and navigate to `Maintenance -> Logging`. Under system metrics you can enable collectd to send to your system.

![image info](/images/expressway_collectd.png)

6. Check your csv files

If everything went right you should have a nice structured set of folders containing all the collectd metrics under `/var/lib/collectd/csv`

![image info](/images/expressway_tree.png)

And that's a wrap. I'll try to do a follow up to this one and explain how I configured collectd with the `write_splunk` plugin to send these metrics over to Splunk via the HEC interface.
