import { useState } from 'react';
import { 
  MessageCircle,
  Search,
  Phone,
  Video,
  MoreHorizontal,
  Send,
  Paperclip,
  Smile,
  ExternalLink,
  Clock,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { useI18n } from '../contexts/i18nContext';

const MessagesPage = ({ onNavigate, onProductSelect }) => {
  const { t } = useI18n();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, unread, archived

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      participant: {
        name: 'Sarah Johnson',
        department: 'Operations',
        avatar: 'SJ',
        status: 'online',
        responseTime: '< 1 hour'
      },
      product: {
        id: 2,
        title: 'IKEA Standing Desk',
        price: 350,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop'
      },
      lastMessage: {
        text: 'Hi! Is the desk still available? I\'m very interested.',
        time: '2 mins ago',
        sender: 'them',
        isRead: false
      },
      unreadCount: 2,
      isArchived: false,
      messages: [
        {
          id: 1,
          text: 'Hi! I\'m interested in your standing desk. Is it still available?',
          time: '10:30 AM',
          sender: 'them',
          timestamp: new Date(Date.now() - 2 * 60 * 1000)
        },
        {
          id: 2,
          text: 'Yes, it\'s still available! It\'s in great condition, barely used.',
          time: '10:35 AM',
          sender: 'me',
          timestamp: new Date(Date.now() - 1 * 60 * 1000)
        },
        {
          id: 3,
          text: 'Perfect! Could you tell me more about the height adjustment mechanism?',
          time: '10:37 AM',
          sender: 'them',
          timestamp: new Date()
        }
      ]
    },
    {
      id: 2,
      participant: {
        name: 'Mike Chen',
        department: 'Marketing',
        avatar: 'MC',
        status: 'away',
        responseTime: '< 3 hours'
      },
      product: {
        id: 3,
        title: 'Canon EOS R6 Camera',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop'
      },
      lastMessage: {
        text: 'Thanks for your interest! The camera includes 2 lenses.',
        time: '1 hour ago',
        sender: 'me',
        isRead: true
      },
      unreadCount: 0,
      isArchived: false,
      messages: [
        {
          id: 1,
          text: 'Hi Mike, I saw your camera listing. Does it come with any lenses?',
          time: 'Yesterday 2:15 PM',
          sender: 'me',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
        },
        {
          id: 2,
          text: 'Yes! It comes with a 24-70mm f/2.8 and a 70-200mm f/4. Both are in excellent condition.',
          time: 'Yesterday 2:45 PM',
          sender: 'them',
          timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000)
        },
        {
          id: 3,
          text: 'That sounds perfect! When would be a good time to see it?',
          time: 'Yesterday 3:00 PM',
          sender: 'me',
          timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000)
        },
        {
          id: 4,
          text: 'I\'m available this week after 5 PM. Would Thursday work?',
          time: '1 hour ago',
          sender: 'them',
          timestamp: new Date(Date.now() - 60 * 60 * 1000)
        }
      ]
    },
    {
      id: 3,
      participant: {
        name: 'Emma Thompson',
        department: 'HR',
        avatar: 'ET',
        status: 'offline',
        responseTime: '< 4 hours'
      },
      product: {
        id: 7,
        title: 'Dining Table Set',
        price: 520,
        image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop'
      },
      lastMessage: {
        text: 'Great! Let me know when you\'d like to pick it up.',
        time: '2 days ago',
        sender: 'them',
        isRead: true
      },
      unreadCount: 0,
      isArchived: false,
      messages: []
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = searchQuery === '' || 
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.product.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
      (filterType === 'unread' && conv.unreadCount > 0) ||
      (filterType === 'archived' && conv.isArchived);
    
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = () => {
    if (messageText.trim() && selectedConversation) {
      // Add message to conversation
      const newMessage = {
        id: Date.now(),
        text: messageText.trim(),
        time: 'Just now',
        sender: 'me',
        timestamp: new Date()
      };
      
      // In real app, this would update the conversation
      console.log('Sending message:', newMessage);
      setMessageText('');
    }
  };

  const handleOpenTeams = (conversation) => {
    const teamsUrl = `https://teams.microsoft.com/l/chat/0/0?users=${conversation.participant.name.toLowerCase().replace(' ', '.')}@nab.com.au`;
    window.open(teamsUrl, '_blank');
  };

  const formatTime = (timestamp) => {
    if (typeof timestamp === 'string') return timestamp;
    
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      
      {/* Header - Mobile */}
      <div className="lg:hidden bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-4">
        {selectedConversation ? (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedConversation(null)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {selectedConversation.participant.avatar}
                  </span>
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(selectedConversation.participant.status)} rounded-full border-2 border-white dark:border-slate-800`}></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {selectedConversation.participant.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedConversation.participant.department}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('messages')}
            </h1>
            {totalUnread > 0 && (
              <span className="bg-red-500 text-white rounded-full text-xs px-2 py-1 font-bold">
                {totalUnread}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto lg:h-screen lg:flex">
        
        {/* Sidebar - Conversations List */}
        <div className={`lg:w-1/3 lg:border-r lg:border-gray-200 lg:dark:border-slate-700 bg-white dark:bg-slate-800 ${
          selectedConversation ? 'hidden lg:block' : 'block'
        }`}>
          
          {/* Header */}
          <div className="hidden lg:block p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
                <MessageCircle className="h-6 w-6 text-red-600" />
                <span>{t('messages')}</span>
              </h1>
              {totalUnread > 0 && (
                <span className="bg-red-500 text-white rounded-full text-sm px-3 py-1 font-bold">
                  {totalUnread}
                </span>
              )}
            </div>
            
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchConversations')}
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 lg:px-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex space-x-2">
              {[
                { key: 'all', label: t('all'), count: conversations.length },
                { key: 'unread', label: t('unread'), count: totalUnread },
                { key: 'archived', label: t('archived'), count: 0 }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setFilterType(filter.key)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterType === filter.key
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{filter.label}</span>
                  {filter.count > 0 && (
                    <span className={`rounded-full text-xs px-2 py-0.5 font-bold ${
                      filterType === filter.key
                        ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                        : 'bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-400'
                    }`}>
                      {filter.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations List */}
          <div className="overflow-y-auto h-full">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {searchQuery ? t('noConversationsFound') : t('noMessages')}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {searchQuery ? t('tryDifferentSearch') : t('startConversation')}
                </p>
              </div>
            ) : (
              <div className="space-y-1 p-2 lg:p-4">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`w-full text-left p-4 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-slate-700 ${
                      selectedConversation?.id === conversation.id
                        ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                        : 'border border-transparent'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-white font-bold">
                            {conversation.participant.avatar}
                          </span>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(conversation.participant.status)} rounded-full border-2 border-white dark:border-slate-800`}></div>
                        {conversation.unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-semibold truncate ${
                            conversation.unreadCount > 0 
                              ? 'text-gray-900 dark:text-white' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {conversation.participant.name}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                            {conversation.lastMessage.time}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {conversation.participant.department}
                        </p>
                        
                        {/* Product info */}
                        <div className="flex items-center space-x-2 mb-2">
                          <img
                            src={conversation.product.image}
                            alt={conversation.product.title}
                            className="w-6 h-6 rounded object-cover"
                          />
                          <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {conversation.product.title} - ${conversation.product.price}
                          </span>
                        </div>
                        
                        <p className={`text-sm truncate ${
                          conversation.unreadCount > 0 
                            ? 'text-gray-900 dark:text-white font-medium' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {conversation.lastMessage.sender === 'me' ? 'You: ' : ''}
                          {conversation.lastMessage.text}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`lg:flex-1 flex flex-col ${
          selectedConversation ? 'block' : 'hidden lg:flex'
        }`}>
          
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="hidden lg:flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-white font-bold">
                        {selectedConversation.participant.avatar}
                      </span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(selectedConversation.participant.status)} rounded-full border-2 border-white dark:border-slate-800`}></div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                      {selectedConversation.participant.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{selectedConversation.participant.department}</span>
                      <span>•</span>
                      <span>Response time: {selectedConversation.participant.responseTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenTeams(selectedConversation)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Open in Teams"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Product Context */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedConversation.product.image}
                    alt={selectedConversation.product.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-200">
                      {selectedConversation.product.title}
                    </h4>
                    <p className="text-blue-700 dark:text-blue-300 font-bold">
                      ${selectedConversation.product.price}
                    </p>
                  </div>
                  <button
                    onClick={() => onProductSelect(selectedConversation.product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {t('viewListing')}
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-slate-900">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${
                      message.sender === 'me' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700'
                    } rounded-2xl px-4 py-3 shadow-sm`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div className={`text-xs mt-2 flex items-center space-x-2 ${
                        message.sender === 'me' 
                          ? 'text-red-100' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        <Clock className="h-3 w-3" />
                        <span>{formatTime(message.timestamp)}</span>
                        {message.sender === 'me' && (
                          <CheckCircle2 className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="flex items-end space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 border border-gray-300 dark:border-slate-600 rounded-xl p-3 focus-within:border-red-500 transition-colors">
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={t('typeMessage')}
                        className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <Smile className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Teams integration note */}
                <div className="mt-3 text-center">
                  <button
                    onClick={() => handleOpenTeams(selectedConversation)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center space-x-1 mx-auto"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>{t('openInTeams')}</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Empty state
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-slate-900">
              <div className="text-center max-w-md mx-auto p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <MessageCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t('selectConversation')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t('selectConversationDesc')}
                </p>
                <button
                  onClick={() => onNavigate('home')}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl"
                >
                  {t('browseProducts')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;