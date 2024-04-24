import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';


/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type ArrowButtonProps = {
	openSideBar?: OnClick;
	isOpen: boolean;
};

export const ArrowButton = (props: ArrowButtonProps) => {

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={props.openSideBar}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(
				styles.container,
				props.isOpen ? styles.container_open : ''
			)}
			>	
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, props.isOpen ? styles.arrow_open : '')}
			/>
		</div>
	);
};
