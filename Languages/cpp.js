(function() {
  const data = {
    language: 'cpp',
    prepare: [
      {
        pat: /\:\/\//gm,
        rep: '\:\/\\\/'
      },
      {
        pat: /[\\][\']/gm,
        rep: '$SQ$'
      },
      {
        pat: /[\\][\"]/gm,
        rep: '$DQ$'
      }
    ],
    execute: [
      {
        keyword: /([\'](.*?)[\']|[\"](.*?)[\"])/gm,
        rep: '<span id="value">$&</span>'
      },
      {
        keyword: /\b(int|float|while|private|char|catch|export|virtual|operator|sizeof|dynamic_cast|typedef|const_cast|const|struct|for|static_cast|union|namespace|unsigned|long|volatile|static|protected|bool|template|mutable|if|public|friend|do|goto|auto|void|enum|else|break|extern|using|class|asm|case|typeid|short|reinterpret_cast|default|double|register|explicit|signed|typename|try|this|switch|continue|inline|delete|alignof|constexpr|decltype|noexcept|static_assert|thread_local|restrict|_Bool|complex|_Complex|_Imaginary|atomic_bool|atomic_char|atomic_schar|atomic_uchar|atomic_short|atomic_ushort|atomic_int|atomic_uint|atomic_long|atomic_ulong|atomic_llong|atomic_ullong|new|throw|return)\b/gm,
        rep: '<span id="attribute">$&</span>'
      },
      {
        keyword: /\b(std|string|cin|cout|cerr|clog|stdin|stdout|stderr|stringstream|istringstream|ostringstream|auto_ptr|deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_set|unordered_map|unordered_multiset|unordered_multimap|array|shared_ptr|abort|abs|acos|asin|atan2|atan|calloc|ceil|cosh|cos|exit|exp|fabs|floor|fmod|fprintf|fputs|free|frexp|fscanf|isalnum|isalpha|iscntrl|isdigit|isgraph|islower|isprint|ispunct|isspace|isupper|isxdigit|tolower|toupper|labs|ldexp|log10|log|malloc|realloc|memchr|memcmp|memcpy|memset|modf|pow|printf|putchar|puts|scanf|sinh|sin|snprintf|sprintf|sqrt|sscanf|strcat|strchr|strcmp|strcpy|strcspn|strlen|strncat|strncmp|strncpy|strpbrk|strrchr|strspn|strstr|tanh|tan|vfprintf|vprintf|vsprintf|endl|initializer_list|unique_ptr|true|false|nullptr|NULL)\b/gm,
        rep: '<span id="reserved">$&</span>'
      },
      {
        keyword: /\b(elif|endif|define|undef|warning|error|line|pragma|ifdef|ifndef|include)\b/gm,
        rep: '<span id="parameter">$&</span>'
      },
      {
        begin: {pat: '&lt;', exclude: true},
        end: {pat: '&gt;', exclude: true},
        pat: /([\w]+)/gm,
        rep: '<span id="selector">$&</span>'
      },
      {
        keyword: /([\-]?)(\b[0][Xx][a-fA-F\d]+|([\#]?\b[\d]+([\.][\d]*)?\b|[\.][\d]+)([Ee][\-\+]?[\d]+)?)([\%]|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?/gm,
        rep: '<span id="unit">$&</span>'
      },
      {
        keyword: /[\/][\/].+/gm,
        rep: '<span id="comment">$&</span>'
      },
      {
        nested: 'comment',
        begin: '[\/][\*]',
        end: '[\*][\/]'
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]value[\"][\>][\']', exclude: true},
        end: {pat: '[\'][\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]value[\"][\>][\"]', exclude: true},
        end: {pat: '[\"][\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]comment[\"][\>][\/][\/]', exclude: true},
        end: {pat: '[\<][\/]span[\>]$', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '([\/][\*])\<span\\sid\=\"block\"\>', exclude: true},
        end: {pat: '\<\/span\>([\*][\/])', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      }
    ],
    finalise: [
      {
        pat: /\:\/\\\//gm,
        rep: '\:\/\/'
      },
      {
        pat: /[\$][S][Q][\$]/gm,
        rep: '\\\''
      },
      {
        pat: /[\$][D][Q][\$]/gm,
        rep: '\\\"'
      }
    ]
  };
  clz.Colorize(data);
})();
