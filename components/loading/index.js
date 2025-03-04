import css from "./style.module.css";
const Loading = () => {
    return<div className={css.content}>
        <svg className={css.truck} viewBox="0 0 48 24" width="48px" height="24px">
                <g fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" transform="translate(0,2)">
                    <g className={css.truck__body}>
                        <g stroke-dasharray="105 105">
                            <polyline className={css.truck__outside1} points="2 17,1 17,1 11,5 9,7 1,39 1,39 6" />
                            <polyline className={css.truck__outside2} points="39 12,39 17,31.5 17" />
                            <polyline className={css.truck__outside3} points="22.5 17,11 17" />
                            <polyline className={css.truck__window1} points="6.5 4,8 4,8 9,5 9" />
                            <polygon className={css.truck__window2} points="10 4,10 9,14 9,14 4" />
                        </g>
                        <polyline className={css.truck__line} points="43 8,31 8" stroke-dasharray="10 2 10 2 10 2 10 2 10 2 10 26" />
                        <polyline className={css.truck__line} points="47 10,31 10" stroke-dasharray="14 2 14 2 14 2 14 2 14 18" />
                    </g>
                    <g stroke-dasharray="15.71 15.71">
                        <g className={css.truck__wheel}>
                            <circle className={css.truck__wheel_spin} r="2.5" cx="6.5" cy="17" />
                        </g>
                        <g className={css.truck__wheel}>
                            <circle className={css.truck__wheel_spin} r="2.5" cx="27" cy="17" />
                        </g>
                    </g>
                </g>
        </svg>
        <div className={css.title}>
        Magic Movers LLC
        </div>
        
    </div>
}
export default Loading;