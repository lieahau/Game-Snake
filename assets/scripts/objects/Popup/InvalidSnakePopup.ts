
import { _decorator, Component, Node } from 'cc';
import { TransitionScreen } from '../../utils/TransitionScreen';
const { ccclass, property } = _decorator;

@ccclass('InvalidSnakePopup')
export class InvalidSnakePopup extends Component {
    @property(TransitionScreen)
    private readonly overlayScreen?: TransitionScreen;

    start () {
        this.overlayScreen?.fadeIn(0.3, 127); 
    }
}
