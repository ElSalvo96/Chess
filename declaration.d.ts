declare module 'js-chess-engine' {
  type LetterFen =
    | 'R'
    | 'P'
    | 'N'
    | 'B'
    | 'K'
    | 'Q'
    | 'r'
    | 'p'
    | 'n'
    | 'b'
    | 'k'
    | 'q';

  type configObj = {
    /**
     * Player which plays next. Values white (default) or black.
     */
    turn: 'black' | 'white';
    /**
     * Pieces on your chessboard. Syntax is same as FEN notation.
     */
    pieces: { [key: string]: LetterFen };
    /**
     * Is added to server response when moves() or move() was called. It indicates possible moves for playing player (turn).
     * @example
     * {
     *  "A7": ["A6", "A5"],
     *  "B7": ["B6", "B5"]
     * }
     * Means A7 can move to A6 and A5. B7 can move to B6 and B5.
     *
     */
    moves: { [key: string]: string[] };
    /**
     * true when playing player cannot move (checkmate or draw). Default false.
     */
    isFinished: boolean;
    /**
     * true when playing player is in check. Default false.
     */
    check: boolean;
    /**
     * true when playing player has checkmate. Default false.
     */
    checkMate: boolean;
    /**
     * Indicators if castling is still possible. true means yes. Default true.
     */
    castling: {
      /**
       * (queenside) - White king moves from E1 to C1.
       */
      whiteLong: boolean;
      /**
       * (kingside) - White king moves from E1 to G1.
       */
      whiteShort: boolean;
      /**
       *  (queenside) - Black king moves from E8 to C8
       */
      blackLong: boolean;
      /**
       *  (kingside) - Black king moves from E8 to C8.
       */
      blackShort: boolean;
    };
    /**
     * If a pawn has just made a two-square move, this is the position "behind" the pawn. This is an indicator for enPassant special pawn move. Default null.
     */
    enPassant: string;
    /**
     * This is the number of halfmoves since the last capture or pawn advance. This is used to determine if a draw can be claimed under the fifty-move rule. Default 0.
     */
    halfMove: number;
    /**
     * The number of the full move. It starts at 1, and is incremented after Black's move. Default 1.
     */
    fullMove: number;
  };
  type levelType = 0 | 1 | 2 | 3 | 4;
  class Game {
    /**
     * @param configuration
     */
    constructor(configuration?: configObj);
    /**
     * Perform a move on a chessboard and recalculates in-game situation.
     * @param from (mandatory) - Location on a chessboard where move starts (like A1,B3,...)
     * @param to (mandatory) - Location on a chessboard where move starts (like A1,B3,...)
     * @returns Returns played move {"H7":"H5"}
     */
    move(from: string, to: string): { [key: string]: string };

    /**
     * Return possible moves for playing player.
     * @param from (optional) - Location on a chessboard (like A1,B3,...). When not provided, returns all possible moves.
     * @returns Returns an Object with possible moves for playing player {"B1":["A3","C3"],"G1":["F3","H3"]}
     */
    moves(from?: string): { [key: string]: string[] };

    /**
     * New chess piece is added to provided location. Piece on provided location is replaced.
     * @param location (mandatory) - Location on a chessboard (like A1,B3,...).
     * @param piece (mandatory) - A chess piece you need add (pieces syntax is same as FEN notation).
     * @returns void
     */
    setPiece(location: string, piece: string): void;

    /**
     * Remove piece on provided location.
     * @param location (mandatory) - Location on a chessboard (like A1,B3,...).
     * @returns void
     */
    removePiece(location: string): void;

    /**
     * Calculates and perform next move by computer player.
     * N.B.: game.move(from, to) is called internally. Returns played move {"H7":"H5"}
     * @param level (optional) - Computer player skill from 0 to 4. Read more about computer AI. Default 2.
     * @returns void
     *
     * @example
     *
     * Computer AI
     * This engine includes configurable AI computer logic based on Minimax algorithm. There are five possible levels at this time.
     *
     * Level    Alias               Moves to the future     HW requirements Approx. time to move (s)*
     * 0        Well-trained monkey 1-2                     None            <0.01
     * 1        Beginner            2-4                     Very Low        <0.1
     * 2        Intermediate        2-4                     Low             0.7
     * 3        Advanced            3-5                     Medium          4.6
     * 4        Experienced         4-5                     High            9.5
     *
     * *Approx. time to move (s) - This number represent the average amount of seconds needed for one move during a chess game on t3.nano AWS instance. T3.nano is a low-cost machine with 0.5 GiB RAM and basic CPU performance. Please note, amount of time needed for calculations heavily depends on in-game situation (number of chess pieces still on a chessboard).
     */
    aiMove(level: levelType): { [key: string]: string };
    /**
     * Returns all played moves in array with chess board configuration like [{from:'A2',to:'A3',configuration:{...}},{from:'A7',to:'A6',configuration:{...}}].
     * @param reversed (optional) - When false, last move is the last element in returned array. When true, last move is first. Default false.
     */
    getHistory(reversed: boolean = false): {
      from: string;
      to: string;
      configuration: configObj;
    }[];

    /**
     * Print a chessboard to console standard output.
     */
    printToConsole(): void;

    /**
     * Return in-game situation represented by JSON configuration.
     */
    exportJson(): configObj;

    /**
     * Return in-game situation represented by FEN.
     */
    exportFEN(): string;
  }

  export { Game, configObj, levelType, LetterFen };
}
