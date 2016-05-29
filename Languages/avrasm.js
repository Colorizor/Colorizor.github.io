var avrasm = (function() {
  const data = {
    language: 'avrasm',
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
        keyword: /\b(adc|add|adiw|and|andi|asr|bclr|bld|brbc|brbs|brcc|brcs|break|breq|brge|brhc|brhs|brid|brie|brlo|brlt|brmi|brne|brpl|brsh|brtc|brts|brvc|brvs|bset|bst|call|cbi|cbr|clc|clh|cli|cln|clr|cls|clt|clv|clz|com|cp|cpc|cpi|cpse|dec|eicall|eijmp|elpm|eor|fmul|fmuls|fmulsu|icall|ijmp|in|inc|jmp|ld|ldd|ldi|lds|lpm|lsl|lsr|mov|movw|mul|muls|mulsu|neg|nop|or|ori|out|pop|push|rcall|ret|reti|rjmp|rol|ror|sbc|sbr|sbrc|sbrs|sec|seh|sbi|sbci|sbic|sbis|sbiw|sei|sen|ser|ses|set|sev|sez|sleep|spm|st|std|sts|sub|subi|swap|tst|wdr)\b/gm,
        rep: '<span id="attribute">$&</span>'
      },
      {
        keyword: /[\.]\b(byte|cseg|db|def|device|dseg|dw|endmacro|equ|eseg|exit|include|list|listmac|macro|nolist|org|set)\b/gm,
        rep: '<span id="selector">$&</span>'
      },
      {
        keyword: /\b(ucsr1c|udr1|ucsr1a|ucsr1b|ubrr1l|ubrr1h|ucsr0c|ubrr0h|tccr3c|tccr3a|tccr3b|tcnt3h|tcnt3l|ocr3ah|ocr3al|ocr3bh|ocr3bl|ocr3ch|ocr3cl|icr3h|icr3l|etimsk|etifr|tccr1c|ocr1ch|ocr1cl|twcr|twdr|twar|twsr|twbr|osccal|xmcra|xmcrb|eicra|spmcsr|spmcr|portg|ddrg|ping|portf|ddrf|sreg|sph|spl|xdiv|rampz|eicrb|eimsk|gimsk|gicr|eifr|gifr|timsk|tifr|mcucr|mcucsr|tccr0|tcnt0|ocr0|assr|tccr1a|tccr1b|tcnt1h|tcnt1l|ocr1ah|ocr1al|ocr1bh|ocr1bl|icr1h|icr1l|tccr2|tcnt2|ocr2|ocdr|wdtcr|sfior|eearh|eearl|eedr|eecr|porta|ddra|pina|portb|ddrb|pinb|portc|ddrc|pinc|portd|ddrd|pind|spdr|spsr|spcr|udr0|ucsr0a|ucsr0b|ubrr0l|acsr|admux|adcsr|adch|adcl|porte|ddre|pine|pinf)\b/gm,
        rep: '<span id="reserved">$&</span>'
      },
      {
        keyword: /\b(r0|r1|r2|r3|r4|r5|r6|r7|r8|r9|r10|r11|r12|r13|r14|r15|r16|r17|r18|r19|r20|r21|r22|r23|r24|r25|r26|r27|r28|r29|r30|r31|(x|0)|xh|xl|(y|0)|yh|yl|(z|0)|zh|zl)\b/gm,
        rep: '<span id="parameter">$&</span>'
      },
      {
        keyword: /([\-]?)(\b[0][Xx][a-fA-F\d]+|([\#]?\b[\d]+([\.][\d]*)?\b|[\.][\d]+)([Ee][\-\+]?[\d]+)?)([\%]|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?/gm,
        rep: '<span id="unit">$&</span>'
      },
      {
        keyword: /[\;\$].+/gm,
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
        pat: /\<(\/)?span(.*?)\>/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]value[\"][\>][\"]', exclude: true},
        end: {pat: '[\"][\<][\/]span[\>]', exclude: true},
        pat: /\<(\/)?span(.*?)\>/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]comment[\"][\>][\;\$]', exclude: true},
        end: {pat: '[\<][\/]span[\>]$', exclude: true},
        pat: /\<(\/)?span(.*?)\>/gm,
        rep: ''
      },
      {
        begin: {pat: '([\/][\*])\<span\\sid\=\"block\"\>', exclude: true},
        end: {pat: '\<\/span\>([\*][\/])', exclude: true},
        pat: /\<(\/)?span(.*?)\>/gm,
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
  return {
    Colorize: function() {
      clz.Colorize(data);
    },
    Editorize: function(object) {
      clz.Colorize(data, $(object));
    }
  };
})();
avrasm.Colorize();
