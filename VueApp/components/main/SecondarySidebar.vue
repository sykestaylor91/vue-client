<template>
    <div class="aside-menu">
        <span style="display:none">{{user.userName}}</span>
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item" v-if="typeof historyItems !== 'undefined' && historyItems.length > 0">
                <a class="nav-link active" data-toggle="tab" href="#recent" role="tab">
                    <i class="fa fa-history"></i>
                    <span v-if="typeof historyItems !== 'undefined'" class="label label-info">{{ historyItems.length }}</span>
                </a>
            </li>
            <li class="nav-item">
                <a v-bind:class="((typeof historyItems !== 'undefined' && historyItems.length > 0) ? '' : 'active ') + 'nav-link'" 
                   data-toggle="tab" href="#messages" role="tab">
                    <i class="icon-envelope-letter"></i>
                    <span class="label label-success item-count" >{{user.messageCount}}19</span>
                </a>
            </li>
			<li class="nav-item">
				<a class="nav-link" data-toggle="tab" href="#favorites" role="tab">
					<i class="fa fa-star favorite" ></i>
					<span class="label label-warning item-count">{{ user.favoriteCount }}19</span>
				</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" data-toggle="tab" href="#notifications" role="tab">
					<i class="icon-bell"></i>
					<span class="label label-warning item-count">{{ user.notificationCount }}19</span>
				</a>
			</li>
			<li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#shoppingCart" role="tab">
                    <i class="fa fa-shopping-cart"></i>
                    <span class="label label-info item-count">0</span>
                </a>
            </li>
        </ul>
        <div class="tab-content">
            <div v-if="typeof historyItems !== 'undefined' && historyItems.length > 0"
                 class="tab-pane p-1 active" id="recent" role="tabpanel" style="overflow-y:auto">
                <div class="row" v-for="type in historyItemTypes()">
                    <div class="col-12">
                        <div class="header">
                            <strong>Recent {{type.title}}</strong>
                        </div>
                        <div>
                            <div v-for="item in orderBy(getHistoryItemsByType(type.type), 'timeStamp', -1)">
                                <div class="message">
                                    <router-link class="dropdown-item" :to="item.route">
                                        <div>
                                            <small class="text-muted">{{item.subject}}</small>
                                            <small class="text-muted float-right mt-q">
                                                {{item.timeStamp | localeDateOrTimeToday}}
                                            </small>
                                        </div>
                                        <div v-bind:class="(item.showWarning ? 'text-warning ' : '') + 'text-truncate font-weight-bold'">
                                            {{item.headline}}
                                        </div>
                                        <div class="text-muted">{{item.content | truncate}}</div>
                                    </router-link>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-bind:class="((typeof historyItems === 'undefined' || historyItems.length < 1) ? 'active ' : '') + 'tab-pane p-1'" id="messages" role="tabpanel">
                <div class="header">
                    <strong>You have {{ user.messageCount }} message(s)</strong>
                </div>
                <div v-if="user.hasMessages">
                    <div v-for="message in user.customData.messages">
                        <div class="message">
                            <router-link exact class="dropdown-item" :to="{name: 'Mailbox', params: {type: 'messages'}}">
                                <div>
                                    <small class="text-muted">{{message.from}}</small>
                                    <small class="text-muted float-right mt-q">
                                        {{message.timeStamp | localeDateOrTimeToday}}
                                    </small>
                                </div>
                                <div class="text-truncate font-weight-bold">{{message.subject}}</div>
                                <div class="text-muted">{{message.text | truncate}}</div>
                            </router-link>
                        </div>
                        <hr />
                    </div>
                    <a href="#" class="dropdown-item text-center">
                        <strong><router-link exact :to="{name: 'Mailbox', params: {type: 'messages'}}">View all messages</router-link></strong>
                    </a>
                </div>
            </div>
            <div class="tab-pane p-1" id="notifications" role="tabpanel">
                <div class="header"><strong>You have {{ user.notificationCount }} notification(s)</strong></div>
                <div v-if="user.hasNotifications">
                    <div v-for="notification in user.customData.notifications">
                        <div class="message">
                            <router-link exact class="dropdown-item" :to="{name: 'Mailbox', params: {type: 'notifications'}}">
                                <div>
                                    <small class="text-muted">{{notification.from}}</small>
                                    <small class="text-muted float-right mt-q">
                                        {{notification.timeStamp | localeDateOrTimeToday}}
                                    </small>
                                </div>
                                <div class="text-truncate font-weight-bold">{{notification.subject}}</div>
                                <div class="text-muted">{{notification.text | truncate}}</div>
                            </router-link>
                        </div>
                        <hr />

                        <a href="#" class="dropdown-item text-center">
                            <strong>
                                <router-link exact :to="{name: 'Mailbox', params: {type: 'notifications'}}">
                                    View all notifications
                                </router-link>
                            </strong>
                        </a>

                    </div>
                </div>
            </div>
            <div class="tab-pane p-1" id="favorites" role="tabpanel">
                <div class="header"><strong>You have {{ user.favoriteCount }} favorite specimen(s)</strong></div>
                <div v-if="user.hasFavorites">
                    <div v-for="favorite in user.customData.favorites">
                        <!--<div class="message">
                            <router-link exact class="dropdown-item" :to="{name: 'Mailbox', params: {type: 'notifications'}}">
                                <div>
                                    <small class="text-muted">{{notification.from}}</small>
                                    <small class="text-muted float-right mt-q">
                                        {{notification.timeStamp | localeDateOrTimeToday}}
                                    </small>
                                </div>
                                <div class="text-truncate font-weight-bold">{{notification.subject}}</div>
                                <div class="text-muted">{{notification.text | truncate}}</div>
                            </router-link>
                        </div>
                        <hr />

                        <a href="#" class="dropdown-item text-center">
                            <strong>
                                <router-link exact :to="{name: 'Mailbox', params: {type: 'notifications'}}">
                                    View all notifications
                                </router-link>
                            </strong>
                        </a>-->

                    </div>
                </div>
            </div>
            <div class="tab-pane p-1" id="shoppingCart" role="tabpanel">
                <div class="header"><strong>You have 0 specimen(s) in your cart</strong></div>
            </div>
        </div>
    </div>
</template>
<script src="./SecondarySidebar.vue.js">
    
</script>