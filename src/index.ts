import * as ts from 'typescript';

export const transformerFactory: ts.TransformerFactory<ts.Node> = (context) => (bundle) => {
    function visitor(node: ts.Node): ts.Node {
        if (ts.isTypeOperatorNode(node) && node.operator === ts.SyntaxKind.ReadonlyKeyword && ts.isArrayTypeNode(node.type))
            return ts.createTypeReferenceNode('ReadonlyArray', [unwrapParens(<ts.TypeNode>visitor(node.type.elementType))]);
        return ts.visitEachChild(node, visitor, context);
    }
    return ts.visitNode(bundle, visitor);
};

function unwrapParens(node: ts.TypeNode): ts.TypeNode {
    while (ts.isParenthesizedTypeNode(node))
        node = node.type;
    return node;
}

export default function(context: ts.TransformationContext): ts.Transformer<ts.Node>;
export default function(program: ts.Program, config?: Record<string, unknown>): ts.TransformerFactory<ts.Node>;
export default function(programOrContext: ts.Program | ts.TransformationContext) {
    if ('readEmitHelpers' in programOrContext)
        return transformerFactory(programOrContext);
    return transformerFactory;
}
