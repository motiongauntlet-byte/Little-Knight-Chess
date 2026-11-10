/* Little Knight Chess lessons.
   This file holds every lesson. The app reads it when it starts, so lessons can be added
   or changed here without touching index.html.

   SECTIONS are the tabs on the Learn a Trick screen, in order.
   Each LESSON has:
     id      a short unique name. Stars are saved by id, so never reuse or rename one.
     section the id of the tab it belongs to.
     icon    a piece picture: w or b, then P N B R Q or K (for example 'wN').
     title, blurb   the words on the lesson tile.
     steps   the screens of the lesson, in order. Each step has a type t:
       'show'  the coach explains. Optional play:[moves] animates moves, marks:{g:[...],r:[...]}
               colors squares green or red, arrows:[[from,to]] draws arrows, labels:{sq:'text'}.
       'try'   the child finds a move. Use sol:['e2e4|d2d4', reply, next...] (| means either is right),
               or goal:{mate:N} for checkmate in N, goal:{good:150} for any move within 1.5 pawns
               of the best move, goal:'safe' for any move that does not allow mate, or goal:'any'.
       'game'  a mini game against the computer at level 1-10. goal is 'mate', 'promote' (make a
               queen first), 'hunt' (capture every enemy pawn) or 'castle' (castle without
               losing a piece). Add win and lose messages.
     Every step needs say. Try and game steps need hint. Try steps can have good.
     fen sets the position. Leave it out to continue from the previous step. Use START for
     the normal starting position. Moves are written from-square then to-square, like 'e2e4'.

   Spoken lines use the recorded coach voice from voice.js when the exact sentence has a
   recording, and the device voice otherwise. */
(function(){
const START='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
window.LKC_LESSONS={
version:'2026.11.10',
sections:[
 {id:'basic',name:'Basic'},
 {id:'intermediate',name:'Intermediate'},
 {id:'advanced',name:'Advanced'},
 {id:'opening',name:'Openings'},
 {id:'middle',name:'Middle Game'},
 {id:'endgame',name:'Endgame'}
],
lessons:
[
/* ---------- BASIC ---------- */
{id:'points',section:'basic',icon:'wQ',title:'What Are They Worth?',blurb:'Know your strongest pieces',steps:[
 {t:'show',fen:'8/8/8/2PNBRQ1/8/8/8/8 w',say:'Every piece has a number. A pawn is worth 1 point.',marks:{g:['c5']},labels:{c5:'1'}},
 {t:'show',say:'A knight is worth 3. A bishop is worth 3 too.',marks:{g:['d5','e5']},labels:{c5:'1',d5:'3',e5:'3'}},
 {t:'show',say:'A rook is worth 5. The queen is worth 9! She is your strongest piece.',marks:{g:['f5','g5']},labels:{c5:'1',d5:'3',e5:'3',f5:'5',g5:'9'}},
 {t:'try',fen:'6k1/8/1r3p2/8/3Q4/8/8/K7 w',say:'Your queen can take a pawn or a rook. Take the piece worth the most!',sol:['d4b6'],hint:'A rook is worth 5. A pawn is worth 1.',good:'Yes! Five points is better than one.'},
 {t:'try',fen:'6k1/8/2q1p3/8/3N4/5r2/8/K7 w',say:'Your knight can take three pieces. Which one is worth the most?',sol:['d4c6'],hint:'Look for the queen. She is worth 9.',good:'You got the queen! That is 9 points.'}
]},
{id:'free',section:'basic',icon:'bP',title:'Free Pieces',blurb:'Take what nobody is guarding',steps:[
 {t:'show',fen:'6k1/8/2p5/3p4/8/8/8/3R2K1 w',say:'Before you take a piece, look for its friends. This pawn has a friend guarding it.',marks:{r:['d5']},arrows:[['c6','d5']]},
 {t:'show',say:'If your rook takes it, the other pawn takes your rook. That is a bad deal!',play:['d1d5','c6d5'],marks:{r:['d5']}},
 {t:'try',fen:'6k1/8/2p5/3p2n1/8/8/8/3R2RK w',say:'One piece is guarded. One piece is free. Take the free one!',sol:['g1g5'],hint:'The pawn in the middle has a friend. Does the knight have a friend?',good:'Free points! Nobody could take your rook back.'},
 {t:'try',fen:'6k1/8/p7/1p3p2/8/3B4/8/6K1 w',say:'Your bishop can take two pawns. Which one is free?',sol:['d3f5'],hint:'Find the pawn with no friend next to it.',good:'Smart! You checked for friends first.'}
]},
{id:'check',section:'basic',icon:'wK',title:'Three Ways Out of Check',blurb:'Move, block, or capture',steps:[
 {t:'show',fen:'4r1k1/8/8/8/8/8/8/4K3 w',say:'Check means your king is being attacked. You must fix it right away.',arrows:[['e8','e1']],marks:{r:['e1']}},
 {t:'show',say:'Way number one. Move your king to a safe square.',play:['e1d1']},
 {t:'show',fen:'4r1k1/8/8/8/8/2B5/8/4K3 w',say:'Way number two. Block the attack by putting a piece in the way.',play:['c3e5']},
 {t:'show',fen:'4r1k1/8/8/8/B7/8/8/4K3 w',say:'Way number three. Capture the piece that is attacking you.',play:['a4e8']},
 {t:'try',fen:'6k1/8/8/8/8/3B4/5PPP/4r1K1 w',say:'Check! Your king is stuck behind his pawns. Block the rook.',sol:['d3f1'],hint:'Your bishop can jump in the way, right next to your king.',good:'Blocked! Your king is safe.'},
 {t:'try',fen:'6k1/8/1b6/8/8/8/5qPP/R4RK1 w',say:'Check from the queen! Can you capture her?',sol:['f1f2'],hint:'Your rook is right next to her.',good:'You took the queen!'},
 {t:'try',fen:'3rr1k1/8/8/8/8/8/8/4K3 w',say:'Check! Step your king to a safe square. Watch out for the other rook.',goal:'any',hint:'The rook on the left covers one whole line. Go the other way.',good:'Safe! Always look before your king moves.'}
]},
{id:'mate1',section:'basic',icon:'bK',title:'Checkmate in One',blurb:'Finish the game',steps:[
 {t:'show',fen:'6k1/5ppp/8/8/8/8/8/R5K1 w',say:'Checkmate means the king is in check and there is no way out.',marks:{r:['g8']}},
 {t:'show',say:'The rook slides up. The king is attacked. His own pawns are in the way. Game over!',play:['a1a8'],arrows:[['a8','g8']]},
 {t:'try',fen:'6k1/5ppp/8/8/8/8/5PPP/3R2K1 w',say:'Your turn. Find checkmate in one move!',goal:{mate:1},hint:'Slide the rook all the way to the top.',good:'Checkmate!'},
 {t:'try',fen:'7k/8/6K1/8/8/8/8/1Q6 w',say:'Your king is helping. Use your queen to give checkmate.',goal:{mate:1},hint:'Send the queen to the top row.',good:'Checkmate! The king and queen make a great team.'},
 {t:'try',fen:'6k1/5p1p/5PpQ/8/8/8/8/6K1 w',say:'Your pawn is helping your queen. Find checkmate.',goal:{mate:1},hint:'Put the queen right in front of the king. Your pawn guards her.',good:'Checkmate! The pawn kept your queen safe.'}
]},
{id:'ladder',section:'basic',icon:'wR',title:'The Rook Ladder',blurb:'Two rooks climb to checkmate',steps:[
 {t:'show',fen:'8/8/8/4k3/8/8/1R6/R5K1 w',say:'Two rooks can push a king to the edge, like climbing a ladder.'},
 {t:'show',say:'The first rook makes a wall. The king cannot cross it.',play:['a1a4','e5f5'],marks:{g:['a4','b4','c4','d4','e4','f4','g4','h4']}},
 {t:'show',say:'The other rook climbs one step higher. Check! The king must go up.',play:['b2b5','f5f6']},
 {t:'show',say:'Now the first rook climbs past it. Check again!',play:['a4a6','f6f7']},
 {t:'show',say:'Step, step, step. The king is almost at the top.',play:['b5b7','f7f8']},
 {t:'show',say:'One last step. Checkmate!',play:['a6a8'],arrows:[['a8','f8']]},
 {t:'try',fen:'8/5k2/R7/1R6/8/8/8/6K1 w',say:'Your turn. Climb one rung higher and give check.',sol:['b5b7|a6a7'],hint:'Move the lower rook up past the other rook.',good:'Nice climbing!'},
 {t:'try',fen:'5k2/1R6/8/8/8/R7/8/6K1 w',say:'The king is on the top row. Finish it!',goal:{mate:1},hint:'Bring the other rook to the top row.',good:'Checkmate! You climbed the ladder.'},
 {t:'game',fen:'8/8/8/4k3/8/8/1R6/R5K1 w',level:4,goal:'mate',say:'Now do the whole ladder. If the king comes close to a rook, slide that rook far away on the same row.',hint:'One rook makes the wall. The other rook gives check one row higher.',win:'Checkmate! You are a ladder champion.',lose:'The king got away this time. Try the ladder again.'}
]},
{id:'stalemate',section:'basic',icon:'bK',title:'Watch Out for Stalemate',blurb:'Win, do not tie',steps:[
 {t:'show',fen:'k7/8/8/1Q6/8/8/8/K7 w',say:'Stalemate is a tie. It happens when a player has no moves, but is not in check.'},
 {t:'show',say:'Look what happens if the queen moves here. The king is not in check, and he cannot move. It is a tie!',play:['b5b6'],marks:{r:['a7','b7','b8']}},
 {t:'try',fen:'k7/2K5/8/1Q6/8/8/8/8 w',say:'Your king is close. Give checkmate, not stalemate!',goal:{mate:1},hint:'Your move must attack the king.',good:'Checkmate! You remembered to give check.'},
 {t:'try',fen:'7k/8/5K2/8/8/8/8/6Q1 w',say:'One more. Make sure your move is a check.',goal:{mate:1},hint:'Your king can guard your queen right next to the enemy king.',good:'Checkmate! No tie today.'}
]},
{id:'opening',section:'basic',icon:'wP',title:'Three Rules for a Good Start',blurb:'Pawns, pieces, castle',steps:[
 {t:'show',fen:START,say:'Rule one. Put a pawn in the middle of the board.',play:['e2e4','e7e5']},
 {t:'show',say:'Rule two. Bring out your knights and bishops.',play:['g1f3','b8c6','f1c4','f8c5']},
 {t:'show',say:'Rule three. Castle! Your king hides in the corner and your rook comes out.',play:['e1g1']},
 {t:'try',fen:START,say:'Rule one. Move a pawn to the middle.',sol:['e2e4|d2d4'],hint:'Move one of the two middle pawns forward two squares.',good:'Great start!'},
 {t:'try',fen:'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',say:'Rule two. Bring out a knight toward the middle.',sol:['g1f3|b1c3'],hint:'Jump a knight forward. Pick the square closest to the middle.',good:'That knight is ready to help!'},
 {t:'try',fen:'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 6 5',say:'Rule three. Tap your king and move him two squares toward the rook.',sol:['e1g1'],hint:'Your king moves two steps to the right.',good:'You castled. Your king is safe!'}
]},
{id:'trap',section:'basic',icon:'bQ',title:'Stop the Four-Move Trap',blurb:'Do not get caught early',steps:[
 {t:'show',fen:START,say:'Watch out for this sneaky trap. White brings out the queen and the bishop.',play:['e2e4','e7e5','d1h5','b8c6','f1c4']},
 {t:'show',say:'Black does not see the danger.',play:['g8f6']},
 {t:'show',say:'The queen takes the pawn. The bishop guards her. Checkmate in four moves!',play:['h5f7'],arrows:[['c4','f7']]},
 {t:'try',fen:'r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3',say:'You are Black now. The trap is coming! Stop the queen from taking that pawn next to your king.',sol:['g7g6|d8e7|d8f6'],hint:'A pawn can block the queen. Your queen can guard the pawn too.',good:'Trap stopped! Now her plan is ruined.'}
]},
{id:'pawnwars',section:'basic',icon:'wP',title:'Pawn Wars',blurb:'First pawn to the end wins',steps:[
 {t:'show',fen:'7k/pppppppp/8/8/8/8/PPPPPPPP/7K w',say:'A pawn that reaches the far side becomes a queen. That is why every pawn matters.'},
 {t:'show',say:'Pawns march side by side so they can guard each other.',marks:{g:['c2','d2','e2']}},
 {t:'game',fen:'7k/pppppppp/8/8/8/8/PPPPPPPP/7K w',level:3,goal:'promote',say:'Pawn Wars! Be the first to get a pawn all the way across.',hint:'Stay away from enemy pawns that can capture you. Find an open path.',win:'You made a queen! You win Pawn Wars.',lose:'Their pawn got across first. Want another go?'}
]},

/* ---------- INTERMEDIATE ---------- */
{id:'fork',section:'intermediate',icon:'wN',title:'The Knight Fork',blurb:'One jump, two targets',steps:[
 {t:'show',fen:'r3k3/8/8/3N4/8/8/8/4K3 w',say:'A fork is when one piece attacks two things at the same time. Knights are great at it.'},
 {t:'show',say:'The knight jumps here. It attacks the king and the rook!',play:['d5c7'],arrows:[['c7','e8'],['c7','a8']]},
 {t:'show',say:'The king must move. Then the knight eats the rook. Yum!',play:['e8e7','c7a8']},
 {t:'try',fen:'6k1/5ppp/2q5/5N2/8/8/5PPP/6K1 w',say:'Find the jump that attacks the king and the queen!',sol:['f5e7','g8f8','e7c6'],hint:'Jump next to the king, one row below him.',good:'Fork! You won the queen.'},
 {t:'try',fen:'2r3k1/5ppp/2N5/8/8/8/5PPP/6K1 w',say:'The rook is attacking your knight. But your knight can fork it!',sol:['c6e7','g8f8','e7c8'],hint:'Find a square that touches both the king and the rook with a knight jump.',good:'Great fork! The rook is yours.'},
 {t:'try',fen:'4k3/8/q7/1N6/8/8/8/4K3 w',say:'Another fork! Can you win the queen?',sol:['b5c7','e8d7','c7a6'],hint:'Jump to the second row from the top.',good:'Super fork!'},
 {t:'game',fen:'7k/p1p5/8/8/8/8/8/K1N3N1 w',level:2,goal:'hunt',say:'Knight Hunt! Use your two knights to capture both pawns before they reach the end.',hint:'Find a square where your knight attacks two pawns.',win:'You caught every pawn!',lose:'A pawn got away. Hunt again!'}
]},
{id:'pawnfork',section:'intermediate',icon:'wP',title:'The Pawn Fork',blurb:'Little pawn, big trouble',steps:[
 {t:'show',fen:'6k1/8/8/2n1b3/8/2PP4/8/6K1 w',say:'Pawns can fork too. A pawn attacks both front corners.'},
 {t:'show',say:'One step forward, and the pawn attacks the knight and the bishop.',play:['d3d4'],arrows:[['d4','c5'],['d4','e5']]},
 {t:'try',fen:'6k1/5ppp/8/3n1b2/8/3PP3/5PPP/6K1 w',say:'Push a pawn to attack two pieces.',sol:['e3e4'],hint:'Find the pawn right below the space between the two pieces.',good:'Forked by a pawn!'},
 {t:'try',fen:'6k1/8/2r1n3/8/3P4/8/8/6K1 w',say:'Fork the rook and the knight, then take what is left!',sol:['d4d5','c6c8','d5e6'],hint:'Your pawn only needs one step.',good:'A pawn just beat a knight!'}
]},
{id:'pin',section:'intermediate',icon:'wB',title:'The Pin',blurb:'Stuck to the spot',steps:[
 {t:'show',fen:'4k3/8/2n5/1B6/8/8/8/4K3 w',say:'Look at the black knight. If it moves, the bishop would attack the king. That is against the rules!',arrows:[['b5','e8']],marks:{r:['c6']}},
 {t:'show',say:'We say the knight is pinned. It is stuck, so it cannot run away.',marks:{r:['c6']}},
 {t:'try',fen:'4k3/3n4/8/8/8/8/8/4KB2 w',say:'Move your bishop to pin the knight to the king.',sol:['f1b5'],hint:'Put your bishop on the same line as the knight and the king.',good:'Pinned!'},
 {t:'try',fen:'4k3/8/2n5/1B6/3P4/8/8/4K3 w',say:'The knight is pinned. Attack it with your pawn!',sol:['d4d5','e8d7','d5c6'],hint:'A stuck piece cannot run. Push your pawn next to it.',good:'It could not run away!'},
 {t:'try',fen:'6k1/5q2/8/8/2P1B3/8/8/6K1 w',say:'Pin the queen to her king. Your pawn will guard your bishop.',sol:['e4d5','f7d5','c4d5'],hint:'Move the bishop one square so it looks at the queen and the king.',good:'You traded a bishop for a queen!'}
]},
{id:'skewer',section:'intermediate',icon:'wR',title:'The Skewer',blurb:'Attack through the king',steps:[
 {t:'show',fen:'8/8/8/q2k4/8/8/8/6KR w',say:'A skewer is a backwards pin. The big piece is in front and the prize is behind it.'},
 {t:'show',say:'The rook gives check. The king must move out of the way.',play:['h1h5','d5d6'],arrows:[['h5','a5']]},
 {t:'show',say:'Now the rook takes the queen behind him.',play:['h5a5']},
 {t:'try',fen:'r7/8/2k5/5B2/8/8/8/6K1 w',say:'Skewer the king to win the rook in the corner.',sol:['f5e4','c6b6','e4a8'],hint:'Put your bishop on the long line that goes through the king and the rook.',good:'Skewered!'},
 {t:'try',fen:'8/2k3q1/8/8/8/8/8/R6K w',say:'Check the king so you can take the queen behind him.',sol:['a1a7','c7d6','a7g7'],hint:'Your rook goes straight up to the row with the king and queen.',good:'The rook grabbed the queen!'}
]},
{id:'discover',section:'intermediate',icon:'wB',title:'Surprise Attack',blurb:'Move one piece, reveal another',steps:[
 {t:'show',fen:'4q1k1/8/8/8/4B3/8/8/4R1K1 w',say:'The bishop is blocking the rook. What happens if the bishop moves away?',arrows:[['e1','e8']],marks:{g:['e4']}},
 {t:'show',say:'The bishop gives check. Now the rook can see the queen. Two attacks at once!',play:['e4d5','g8h8']},
 {t:'show',say:'The rook takes the queen. Surprise!',play:['e1e8']},
 {t:'try',fen:'3q2k1/5pp1/8/8/8/3B4/5PPP/3R2K1 w',say:'Move the bishop with check to uncover your rook.',sol:['d3h7','g8h7','d1d8'],hint:'Slide the bishop all the way up to the square next to the king.',good:'Surprise! You won the queen.'},
 {t:'try',fen:'4q1k1/5p1p/6p1/8/4N3/8/5PPP/4R1K1 w',say:'Jump your knight away with check, so your rook sees the queen.',sol:['e4f6','g8g7','f6e8|e1e8'],hint:'Find the knight jump that attacks the king.',good:'What a surprise attack!'}
]},
{id:'backrank',section:'intermediate',icon:'wR',title:'The Back Row Trap',blurb:'Do not trap your own king',steps:[
 {t:'show',fen:'4r1k1/5ppp/8/8/8/8/5PPP/6K1 b',say:'Your king is hiding behind his pawns. That can be dangerous. He has nowhere to run.',marks:{r:['g1']}},
 {t:'show',say:'If the rook comes down, it is checkmate!',play:['e8e1']},
 {t:'try',fen:'4r1k1/5ppp/8/8/8/8/5PPP/6K1 w',say:'Do not let that happen. Make a move that keeps your king safe.',goal:'safe',hint:'Move a pawn forward. Then your king has a place to go.',good:'Now your king has room to breathe!'},
 {t:'try',fen:'r5k1/5ppp/8/8/8/8/4RPPP/4R1K1 w',say:'Their rook guards the back row. Two rooks are stronger! Find checkmate in two moves.',goal:{mate:2},hint:'Offer one rook first. The other rook finishes.',good:'Checkmate! Your rooks worked together.'}
]},
{id:'guard',section:'intermediate',icon:'wB',title:'Remove the Guard',blurb:'Take the protector first',steps:[
 {t:'show',fen:'6k1/5ppp/5n2/3b2B1/8/8/5PPP/3R2K1 w',say:'Your rook wants that bishop. But the knight is guarding it.',arrows:[['d1','d5'],['f6','d5']]},
 {t:'show',say:'So take the guard first!',play:['g5f6','g7f6']},
 {t:'show',say:'Now nobody protects the bishop.',play:['d1d5']},
 {t:'try',fen:'6k1/1p3ppp/2n5/1B2b3/8/7P/5PP1/4R1K1 w',say:'Which piece is guarding their bishop? Take the guard first.',sol:['b5c6','b7c6','e1e5'],hint:'The knight protects the bishop. Your bishop can take the knight.',good:'Guard gone. Bishop won!'}
]},
{id:'queenmate',section:'intermediate',icon:'wQ',title:'Queen and King Checkmate',blurb:'Shrink the box',steps:[
 {t:'show',fen:'8/8/8/3k4/8/8/8/Q3K3 w',say:'A queen and king can always beat a lone king. The queen builds a box around him.'},
 {t:'show',say:'Put your queen one knight jump away from the king. He cannot get past her.',play:['a1c3','d5e4'],marks:{g:['c3']}},
 {t:'show',say:'When he moves, follow him. Stay one knight jump away. The box gets smaller.',play:['c3d2','e4f3'],marks:{g:['d2']}},
 {t:'show',fen:'k7/2Q5/2K5/8/8/8/8/8 b',say:'Careful at the edge! Black has no safe move here and is not in check. That is stalemate, so leave him a square until your king is close.'},
 {t:'try',fen:'k7/8/1K6/8/8/8/8/4Q3 w',say:'Your king is close. Finish with the queen!',goal:{mate:1},hint:'Go to the top row, or next to the king where yours can guard her.',good:'Checkmate!'},
 {t:'game',fen:'8/8/8/3k4/8/8/8/Q3K3 w',level:5,goal:'mate',say:'Now try it all. Build the box, then bring your king.',hint:'Keep the queen a knight jump away. When he is on the edge, walk your king over.',win:'Checkmate! That is a big skill.',lose:'That one was a tie. Check that he has a square to move to.'}
]},

/* ---------- ADVANCED ---------- */
{id:'opposition',section:'advanced',icon:'wK',title:'King Face-Off',blurb:'The opposition',steps:[
 {t:'show',fen:'4k3/8/4K3/4P3/8/8/8/8 b',say:'When two kings face each other with one square between them, the one who must move has to back down.',marks:{g:['e8','e6']}},
 {t:'show',say:'Black must give way. Now the white king can walk forward.',play:['e8d8','e6f7']},
 {t:'try',fen:'4k3/8/8/3K4/4P3/8/8/8 w',say:'Move your king to the sixth row so he leads his pawn.',sol:['d5e6|d5d6'],hint:'Your king goes in front of the pawn, close to the enemy king.',good:'Your king is in charge now!'},
 {t:'game',fen:'4k3/8/4K3/4P3/8/8/8/8 w',level:9,goal:'promote',say:'Walk your pawn to the end and make a queen. Keep your king in front.',hint:'Do not rush the pawn. Move your king so it clears the path.',win:'New queen! You won the face-off.',lose:'That ended in a tie. Keep the king in front and try again.'}
]},
{id:'square',section:'advanced',icon:'bP',title:'The Pawn Square',blurb:'Can the king catch it?',steps:[
 {t:'show',fen:'8/8/8/8/P6k/8/8/7K w',say:'Can the king catch this pawn? Draw a square from the pawn to the top of the board.',marks:{g:['a4','b4','c4','d4','e4','e5','e6','e7','e8','a5','a6','a7','a8','b8','c8','d8']}},
 {t:'show',say:'If the king can step into the square, he catches it. This king is too far away.',marks:{r:['h4']}},
 {t:'try',fen:'8/8/8/8/p7/8/8/4K2k w',say:'That pawn wants to be a queen. Move your king into the square so you can catch it.',sol:['e1d2|e1d1'],hint:'Go toward the pawn. Your king needs to be close to that left side.',good:'You are inside the square. You will catch it!'},
 {t:'game',fen:'8/8/8/8/P6k/8/8/7K w',level:9,goal:'promote',say:'The enemy king is outside the square. Run, pawn, run!',hint:'Keep pushing the pawn.',win:'He never caught you!',lose:'Keep pushing the pawn every turn.'}
]},
{id:'breakthrough',section:'advanced',icon:'wP',title:'Pawn Breakthrough',blurb:'Three pawns smash through',steps:[
 {t:'show',fen:'7k/ppp5/8/PPP5/8/8/8/7K w',say:'Three pawns face three pawns. It looks stuck, but White has a clever trick.'},
 {t:'show',say:'The middle pawn gives itself up.',play:['b5b6','c7b6']},
 {t:'show',say:'Another pawn gives itself up.',play:['a5a6','b7a6']},
 {t:'show',say:'Look! Nothing can stop the last pawn.',play:['c5c6'],arrows:[['c6','c8']]},
 {t:'try',fen:'7k/ppp5/8/PPP5/8/8/8/7K w',say:'Start the breakthrough. Which pawn goes first?',sol:['b5b6'],hint:'The middle pawn goes first.',good:'That is how you crack the wall!'},
 {t:'game',fen:'7k/ppp5/8/PPP5/8/8/8/7K w',level:8,goal:'promote',say:'Now play it out. Get a new queen!',hint:'Give up pawns so one can run free.',win:'Breakthrough! That was brave.',lose:'Their pawn won the race. Start with the middle pawn.'}
]},
{id:'openfile',section:'advanced',icon:'wR',title:'Rooks Love Open Lines',blurb:'Give rooks room to run',steps:[
 {t:'show',fen:'6k1/ppp2ppp/8/8/8/8/PPP2PPP/R5K1 w',say:'A rook is strongest on a line with no pawns on it. We call that an open file.',marks:{g:['d1','d2','d3','d4','d5','d6','d7','d8','e1','e2','e3','e4','e5','e6','e7','e8']}},
 {t:'try',fen:'6k1/ppp2ppp/8/8/8/8/PPP2PPP/R5K1 w',say:'Move your rook to an open line.',sol:['a1d1|a1e1'],hint:'Find a column with no pawns.',good:'Now your rook can see all the way up!'},
 {t:'try',fen:'6k1/ppp2pp1/7p/8/8/8/PPP2PPP/3R2K1 w',say:'Rooks also love the row where the enemy pawns start. Go there!',sol:['d1d7'],hint:'Drive up until you are next to their pawns.',good:'Your rook is attacking all those pawns!'}
]},
{id:'outpost',section:'advanced',icon:'wN',title:'A Home for Your Knight',blurb:'Outposts beat the edge',steps:[
 {t:'show',fen:'6k1/5ppp/8/8/8/N7/5PPP/6K1 w',say:'A knight on the edge can only reach a few squares. Knights want to be in the middle.',marks:{r:['a3']}},
 {t:'try',fen:'6k1/5ppp/8/8/8/N7/5PPP/6K1 w',say:'Bring your knight toward the middle.',sol:['a3c4|a3b5|a3c2'],hint:'Jump toward the center of the board.',good:'More squares to attack!'},
 {t:'show',fen:'6k1/pp3ppp/3p4/8/2P5/2N5/PP3PPP/6K1 w',say:'Best of all is a square where your pawn guards your knight, and no enemy pawn can chase it away.',marks:{g:['d5']},arrows:[['c4','d5']]},
 {t:'try',fen:'6k1/pp3ppp/3p4/8/2P5/2N5/PP3PPP/6K1 w',say:'Give your knight its best home.',sol:['c3d5'],hint:'Your pawn is already guarding the perfect square.',good:'That knight can stay there all game!'}
]},
{id:'trade',section:'advanced',icon:'wB',title:'Trade When You Are Ahead',blurb:'Make your lead bigger',steps:[
 {t:'show',fen:'3rr1k1/5pp1/7p/8/8/2B2P2/5P1P/3RR1K1 w',say:'When you have more points, swap pieces that are worth the same. With fewer pieces on the board, your extra piece matters more.',marks:{g:['c3']}},
 {t:'try',fen:'3rr1k1/5pp1/7p/8/8/2B2P2/5P1P/3RR1K1 w',say:'You have an extra bishop. Trade a pair of rooks!',sol:['d1d8|e1e8'],hint:'Your rook can capture the rook straight ahead.',good:'Now your bishop is even stronger!'}
]},
{id:'smothered',section:'advanced',icon:'wN',title:'Smothered Mate',blurb:'A knight wins alone',steps:[
 {t:'show',fen:'6rk/6pp/8/6N1/8/8/5PPP/6K1 w',say:'Sometimes a king is surrounded by his own pieces. Only a knight can reach him.',marks:{r:['g8','g7','h7']}},
 {t:'show',say:'The knight jumps in. Checkmate! We call it smothered mate.',play:['g5f7'],arrows:[['f7','h8']]},
 {t:'try',fen:'6rk/6pp/8/6N1/8/8/5PPP/6K1 w',say:'Your turn. Smother that king!',goal:{mate:1},hint:'Jump to the square next to the rook and pawns.',good:'Smothered!'},
 {t:'try',fen:'5r1k/6pp/7N/8/2Q5/8/5PPP/6K1 w',say:'The most famous trick in chess. Give up your queen, then jump in for checkmate.',goal:{mate:2},hint:'Put your queen right next to the king. Your knight guards her.',good:'You sacrificed your queen and won. Amazing!'}
]},
{id:'bridge',section:'advanced',icon:'wR',title:'Build a Bridge',blurb:'A pro endgame trick',steps:[
 {t:'show',fen:'1K6/1P1k4/8/8/8/8/r7/2R5 w',say:'Your pawn is almost a queen, but your own king is in the way. When he steps out, the rook will keep checking him.'},
 {t:'show',say:'First, push the enemy king away with a check.',play:['c1d1','d7e7']},
 {t:'show',say:'Now the secret move. The rook goes to the fourth row. That is the bridge.',play:['d1d4','a2a1'],marks:{g:['d4']}},
 {t:'show',say:'The king walks out. Each check gets him closer to the bridge.',play:['b8c7','a1c1','c7b6','c1b1','b6c6','b1c1']},
 {t:'show',say:'When the rook checks again, block with your own rook. No more checks. The pawn becomes a queen!',play:['c6b5','c1b1','d4b4'],marks:{g:['b4']}},
 {t:'try',fen:'1K6/1P1k4/8/8/8/8/r7/2R5 w',say:'Your turn. Push the king away, then build the bridge.',sol:['c1d1','d7e7','d1d4'],hint:'First give check from the side. Then bring the rook to the fourth row.',good:'You built the bridge! This one is hard for grown-ups too.'}
]},
/* ---------- OPENINGS ---------- */
{id:'op-ideas',section:'opening',icon:'wP',title:'Opening Big Ideas',blurb:'Three jobs at the start',steps:[
 {t:'show',fen:START,say:'The opening is the start of the game. You have three jobs. Grab the middle, wake up your pieces, and keep your king safe.',marks:{g:['d4','e4','d5','e5']}},
 {t:'show',say:'Job one. Put pawns in the middle. That opens doors for your pieces.',play:['e2e4','e7e5']},
 {t:'show',say:'Job two. Wake up your knights and bishops. Try not to move the same piece twice.',play:['g1f3','b8c6','f1c4','f8c5']},
 {t:'show',say:'Job three. Castle early. Your king hides in the corner and your rook joins the game.',play:['e1g1','g8f6']},
 {t:'show',fen:START,say:'Do not bring your queen out too soon. Watch Black chase her and wake up pieces at the same time.',play:['e2e4','e7e5','d1h5','b8c6','f1c4','g7g6','h5f3','g8f6']},
 {t:'try',fen:'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',say:'Your turn. Wake up a piece that is still asleep.',sol:['f1c4|f1b5|b1c3|f1e2'],hint:'Your bishop and your other knight are still at home.',good:'Good! Another piece is ready to play.'},
 {t:'try',fen:'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 6 5',say:'Your pieces are out. Do job three!',sol:['e1g1'],hint:'Move your king two squares toward the rook.',good:'Castled! All three jobs are done.'}
]},
{id:'op-italian',section:'opening',icon:'wB',title:'The Italian Game',blurb:'A classic way to start',steps:[
 {t:'show',fen:START,say:'Openings have names. This one is called the Italian Game. It is great for beginners.'},
 {t:'show',say:'White puts a pawn in the middle. Black does the same.',play:['e2e4','e7e5']},
 {t:'show',say:'The white knight attacks the black pawn. The black knight guards it.',play:['g1f3','b8c6']},
 {t:'show',say:'The white bishop aims at the weak pawn next to the black king.',play:['f1c4'],marks:{r:['f7']},arrows:[['c4','f7']]},
 {t:'try',fen:START,say:'Now you play the Italian Game. Start with the pawn in front of your king.',sol:['e2e4','e7e5','g1f3','b8c6','f1c4'],hint:'King pawn first, then the knight, then the bishop that aims at the black king.',good:'You played the Italian Game!'},
 {t:'try',fen:'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',say:'Black copied you. Now get your king safe!',sol:['e1g1'],hint:'Move your king two squares toward the rook.',good:'Castled! Your king is safe.'}
]},
{id:'op-chase',section:'opening',icon:'bQ',title:'Chase the Early Queen',blurb:'Attack her and grow',steps:[
 {t:'show',fen:START,say:'Sometimes the other player brings the queen out early. That is a chance for you!',play:['e2e4','d7d5','e4d5','d8d5']},
 {t:'show',say:'Bring out a knight that attacks her. She must run away, and you get a free move.',play:['b1c3','d5a5'],arrows:[['c3','a5']]},
 {t:'try',fen:'rnb1kbnr/ppp1pppp/8/3q4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3',say:'Your turn. Bring out a piece that attacks the queen.',sol:['b1c3'],hint:'Your knight can jump to a square that touches the queen.',good:'She has to run away!'},
 {t:'try',fen:'rnbqkbnr/pppp1ppp/8/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR b KQkq - 1 2',say:'You are Black. The white queen attacks your pawn. Guard it and wake up a piece at the same time!',sol:['b8c6'],hint:'Bring out the knight that can guard the pawn.',good:'Pawn guarded, and a knight is awake!'},
 {t:'try',fen:'r1bqkbnr/pppp1p1p/2n3p1/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR b KQkq - 1 4',say:'The queen came back, aiming at the same weak pawn. Block her with a knight!',sol:['g8f6'],hint:'Your other knight can jump in front of the queen.',good:'Blocked! And another knight is awake.'}
]},
{id:'op-queenpawn',section:'opening',icon:'wQ',title:'The Queen Pawn Start',blurb:'Another strong opening',steps:[
 {t:'show',fen:START,say:'Another good start is to push the pawn in front of your queen. Black answers the same way.',play:['d2d4','d7d5']},
 {t:'show',say:'Knight out first. Then the bishop comes out, before a pawn can block it in.',play:['g1f3','g8f6','c1f4'],marks:{g:['f4']}},
 {t:'show',say:'Now the other bishop comes out, and both kings castle. Every piece has a job.',play:['e7e6','e2e3','f8d6','f1d3','e8g8','e1g1']},
 {t:'try',fen:START,say:'Your turn. Play the queen pawn start.',sol:['d2d4','d7d5','g1f3','g8f6','c1f4'],hint:'Queen pawn first, then a knight, then the bishop next to your queen.',good:'Nice! Your bishop is out in front of your pawns.'},
 {t:'try',fen:'rnbqkb1r/ppp2ppp/4pn2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R w KQkq - 0 4',say:'Open a door for your other bishop.',sol:['e2e3'],hint:'Move the pawn in front of your king one square.',good:'Now that bishop can come out too!'}
]},
{id:'op-challenge',section:'opening',icon:'wK',title:'Opening Challenge',blurb:'Do all three jobs in a game',steps:[
 {t:'show',fen:START,say:'Time for a real game! Do all three jobs. Grab the middle, wake up your pieces, then castle.'},
 {t:'game',fen:START,level:2,goal:'castle',say:'You are White. Castle before you lose a piece!',hint:'Push a middle pawn, bring out a knight and a bishop, then castle.',win:'You castled! What a great opening.',lose:'Oops, a piece got taken. Keep your pieces guarded and try again.'},
 {t:'game',fen:'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',level:2,goal:'castle',say:'Now you are Black. Do the three jobs again and castle.',hint:'Push a middle pawn, bring out a knight and a bishop, then castle.',win:'You castled as Black too! You know how to start a game.',lose:'Oops, a piece got taken. Keep your pieces guarded and try again.'}
]},

/* ---------- MIDDLE GAME ---------- */
{id:'mg-ideas',section:'middle',icon:'wQ',title:'Middle Game Big Ideas',blurb:'Look before you move',steps:[
 {t:'show',fen:'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 6',say:'The middle game starts when your pieces are out and your king is safe. Now you look for a plan.'},
 {t:'show',say:'Before every move, look for three things. Checks. Captures. Threats.'},
 {t:'show',say:'Then look at your own pieces. Is anything under attack? Is anything not guarded?'},
 {t:'try',fen:'6k1/5ppp/8/3n4/8/2N5/5PPP/6K1 w - - 0 1',say:'Look for captures. Can you take something for free?',sol:['c3d5'],hint:'Your knight can jump onto a black piece.',good:'Free knight! Always look for captures.'},
 {t:'try',fen:'4k3/8/8/1r6/8/8/7Q/K7 w - - 0 1',say:'Look for checks. Find a check that also wins the rook.',goal:{good:200},hint:'Check the king from a square that also points at the rook.',good:'Check, and the rook is yours. Great looking!'}
]},
{id:'mg-cct',section:'middle',icon:'wN',title:'Checks, Captures, Threats',blurb:'Practice the big three',steps:[
 {t:'show',fen:'6k1/5ppp/8/8/8/2q5/5PPP/3R2K1 w - - 0 1',say:'Strong players check every check, every capture, and every threat. Checks come first, because they can end the game.'},
 {t:'try',fen:'6k1/5ppp/8/8/8/2q5/5PPP/3R2K1 w - - 0 1',say:'Their queen is strong, but look at checks first. Find checkmate!',goal:{mate:1},hint:'Slide your rook all the way up.',good:'Checkmate! Looking at checks first paid off.'},
 {t:'try',fen:'2r3k1/5ppp/8/5N2/8/8/5PPP/6K1 w - - 0 1',say:'Find a check that attacks two pieces at once!',sol:['f5e7','g8f8','e7c8'],hint:'Your knight can jump next to the king and the rook at the same time.',good:'Fork! You won the rook.'},
 {t:'try',fen:'6k1/5pp1/7p/8/3n4/4P3/2Q2PPP/6K1 w - - 0 1',say:'Their knight attacks your queen. Do not just run away. Can you capture the attacker?',sol:['e3d4'],hint:'A pawn is right next to the knight.',good:'You captured the attacker!'}
]},
{id:'mg-safe',section:'middle',icon:'wB',title:'Keep Your Pieces Safe',blurb:'No loose pieces',steps:[
 {t:'show',fen:'6k1/5ppp/8/8/8/2N3B1/5PPP/6K1 w - - 0 1',say:'A piece with no guard is called loose. This knight is loose. The bishop is guarded by a pawn.',marks:{r:['c3'],g:['g3']}},
 {t:'show',say:'Loose pieces are easy targets. Keep your pieces guarded, or keep them away from attackers.'},
 {t:'try',fen:'6k1/q4pp1/7p/8/3N4/8/2P1PPPP/5RK1 w - - 0 1',say:'Their queen attacks your knight. Guard it with a pawn!',sol:['c2c3|e2e3'],hint:'Move a pawn up one square, right next to the knight.',good:'Guarded! Now the queen cannot take it for free.'},
 {t:'try',fen:'3q2k1/5pp1/7p/8/3N4/7P/5PP1/6K1 w - - 0 1',say:'Their queen attacks your knight again. Move it somewhere safe.',goal:{good:150},hint:'Jump to a square the queen cannot reach, or where a pawn guards your knight.',good:'Safe! You saw their threat.'}
]},
{id:'mg-attack',section:'middle',icon:'bK',title:'Attack the King Together',blurb:'Teamwork wins',steps:[
 {t:'show',fen:'r1bq1rk1/ppp2ppp/8/8/8/3B4/PPP2PPP/R2Q1RK1 w - - 0 1',say:'To attack the king, bring lots of pieces. One piece alone is easy to stop.',arrows:[['d3','h7']]},
 {t:'show',say:'The queen joins the bishop. Now two pieces aim at the same square.',play:['d1h5'],marks:{r:['h7']},arrows:[['d3','h7'],['h5','h7']]},
 {t:'try',fen:'r1bq1rk1/ppp2ppp/8/7Q/8/3B4/PPP2PPP/R4RK1 w - - 0 2',say:'Checkmate in one move! Use the queen and bishop team.',goal:{mate:1},hint:'Take the pawn next to the king. The bishop guards your queen.',good:'Checkmate! Teamwork wins.'},
 {t:'try',fen:'r1b2rk1/pppp1ppp/8/6NQ/8/8/PPP2PPP/R4RK1 w - - 0 1',say:'The knight and queen aim at the same square. Find checkmate!',goal:{mate:1},hint:'Take the pawn next to the king. The knight guards your queen.',good:'Checkmate! The knight and queen worked together.'}
]},
{id:'mg-challenge',section:'middle',icon:'wR',title:'Middle Game Challenge',blurb:'Finish with an extra queen',steps:[
 {t:'show',fen:'r5k1/pp3ppp/8/8/8/8/PP3PPP/R2Q2K1 w - - 0 1',say:'Middle Game Challenge! You have an extra queen. Use checks, captures, and threats to finish the game.'},
 {t:'game',fen:'r5k1/pp3ppp/8/8/8/8/PP3PPP/R2Q2K1 w - - 0 1',level:3,goal:'mate',say:'Use your pieces together and find checkmate.',hint:'Look for checks first. Bring your rook to help your queen.',win:'Checkmate! You are a middle game master.',lose:'That one got away. Look for checks, and leave his king a square until you can checkmate.'}
]},

/* ---------- ENDGAME ---------- */
{id:'eg-ideas',section:'endgame',icon:'wK',title:'Endgame Big Ideas',blurb:'When few pieces are left',steps:[
 {t:'show',fen:'8/pp3k2/8/8/8/8/PP3K2/8 w - - 0 1',say:'The endgame is when only a few pieces are left. Now your king becomes a fighter!'},
 {t:'show',say:'Rule one. Bring your king to the middle. From there he can help everywhere.',marks:{g:['d4','e4','d5','e5']},arrows:[['f2','e3']]},
 {t:'show',fen:'8/5k2/8/8/P7/8/5K2/8 w - - 0 1',say:'Rule two. Push a pawn that no enemy pawn can stop. We call it a passed pawn.',marks:{g:['a4']},arrows:[['a4','a8']]},
 {t:'show',say:'Rule three. When you are ahead, trade pieces but keep your pawns. Pawns can turn into new queens!'},
 {t:'try',fen:'8/5ppk/8/8/8/8/5PPP/6K1 w - - 0 1',say:'The queens are gone. Start walking your king to the middle.',sol:['g1f1'],hint:'Step your king toward the center of the board.',good:'Your king is on the way!'},
 {t:'try',fen:'8/6k1/8/8/P7/8/8/6K1 w - - 0 1',say:'No pawn can stop your pawn, and their king is far away. Push it!',sol:['a4a5'],hint:'Move the pawn one step forward.',good:'Run, pawn, run!'}
]},
{id:'eg-king',section:'endgame',icon:'wK',title:'The King Is a Fighter',blurb:'Chase pawns with your king',steps:[
 {t:'show',fen:'8/8/4k3/8/8/1p6/8/2K5 w - - 0 1',say:'In the endgame, your king can chase pawns, just like a bulldozer!',arrows:[['c1','b2']]},
 {t:'game',fen:'8/8/4k3/8/8/1p6/8/2K5 w - - 0 1',level:9,goal:'hunt',say:'Catch the black pawn with your king before it becomes a queen.',hint:'Walk your king next to the pawn, then take it.',win:'Got it! Your king is a hero.',lose:'The pawn got away. Walk toward it right away.'}
]},
{id:'eg-rook',section:'endgame',icon:'wR',title:'Rook Behind the Pawn',blurb:'Push from behind',steps:[
 {t:'show',fen:'1r4k1/8/8/P7/8/8/8/R5K1 w - - 0 1',say:'A rook should stand behind your passed pawn. As the pawn walks up, the rook guards it the whole way.',marks:{g:['a5']},arrows:[['a1','a5']]},
 {t:'try',fen:'4r1k1/8/8/8/P7/8/8/5RK1 w - - 0 1',say:'Put your rook behind your passed pawn.',sol:['f1a1'],hint:'Slide your rook into the corner, right under the pawn.',good:'Now your rook guards the pawn from behind!'},
 {t:'game',fen:'6k1/8/8/P7/8/8/8/R5K1 w - - 0 1',level:7,goal:'promote',say:'Push the pawn all the way, with your rook behind it.',hint:'Push the pawn every move. The rook keeps it safe.',win:'New queen! The rook helped the whole way.',lose:'Keep the rook behind the pawn and try again.'}
]},
{id:'eg-race',section:'endgame',icon:'bP',title:'Pawn Races',blurb:'Count the steps',steps:[
 {t:'show',fen:'1k6/8/p7/8/6P1/8/8/7K w - - 0 1',say:'When both sides have a free pawn, it is a race to make a new queen.',marks:{g:['g4'],r:['a6']}},
 {t:'show',say:'Count the steps. Your pawn needs four steps. Their pawn needs five. You will win the race!',arrows:[['g4','g8'],['a6','a1']]},
 {t:'game',fen:'1k6/8/p7/8/6P1/8/8/7K w - - 0 1',level:9,goal:'promote',say:'Race! Get your pawn to the end first.',hint:'Push your pawn every single move.',win:'You won the race!',lose:'Their pawn was faster. Push your pawn every move.'}
]},
{id:'eg-rookmate',section:'endgame',icon:'wR',title:'Rook and King Checkmate',blurb:'Edge, face off, check',steps:[
 {t:'show',fen:'4k3/8/4K3/8/8/8/8/7R w - - 0 1',say:'A rook and a king can checkmate too. First push the enemy king to the edge.'},
 {t:'show',say:'When the kings face each other, the rook checks on the edge. Checkmate!',play:['h1h8'],arrows:[['h8','e8']]},
 {t:'try',fen:'3k4/8/3K4/8/8/8/8/R7 w - - 0 1',say:'Kings face to face. Finish it!',goal:{mate:1},hint:'Slide the rook to the top row.',good:'Checkmate!'},
 {t:'try',fen:'k7/8/1K6/8/8/8/8/7R w - - 0 1',say:'The king is in the corner. Find checkmate.',goal:{mate:1},hint:'Check him on the top row.',good:'Checkmate! The corner is a trap.'},
 {t:'game',fen:'3k4/8/8/2K5/8/8/8/7R w - - 0 1',level:9,goal:'mate',say:'Now do it all. Use your king and rook to push him to the edge, then checkmate.',hint:'Make his box smaller with your rook. Bring your king close.',win:'Checkmate! That is a big endgame skill.',lose:'That was a tie. Make sure he always has a square to move to.'}
]}
]
};
})();
