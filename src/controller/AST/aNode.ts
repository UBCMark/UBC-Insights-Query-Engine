import ANDNode from "./ANDNode";
import NOTNode from "./NOTNode";
import ORNode from "./ORNode";
import EQNode from "./EQNode";
import ISNode from "./ISNode";
import GTNode from "./GTNode";

export default class Filter {
    parse(){
        if (node == "AND") return ANDNode.evaluate(child1.parse(), child2.parse())
        if (node == "OR") return ORNode.evaluate(child1.parse(), child2.parse())
        if (node == "NOT") return NOTNode.evaluate(child.parse())
        if (node == "IS") return ISNode.evaluate(child.parse())
        if (node == "GT") return GTNode.evaluate(child.parse())
        if (node == "EQ") return EQNode.evaluate(child.parse())
    }
}