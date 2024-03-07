import Statement from ".";

import { TokenTypes } from "../../../constants/bhaiLangSpec";
import { NodeType } from "../../../constants/constants";
import { ASTNode } from "../types/nodeTypes";

import Expression from "./expression";

// this is just a copy of print statement
export default class InputStatement extends Statement {
  getStatement(): ASTNode {
    this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.SUNO_BHAI_TYPE); // starts at suno bhai 

    const expressions = this._getExpressionList();

    this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.SEMI_COLON_TYPE); // ends at semi colon (duh)

    return {
      type: NodeType.InputStatement,
      expressions,
    };
  }

  private _getExpressionList() {
    const expressions: any[] = [];

    do {
      expressions.push(this._getExpression());
    } while (
      this._tokenExecutor.getLookahead()?.type === TokenTypes.COMMA_TYPE && // uses comma to seperate different inputs
      this._tokenExecutor.eatTokenAndForwardLookahead(TokenTypes.COMMA_TYPE)
    );

    return expressions;
  }

  private _getExpression() {
    return Expression.getExpressionImpl(
      NodeType.AssignmentExpression
    ).getExpression();
  }
}
