import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type ArrowButtonProps = {
	openSideBar?: OnClick;
	isOpen: boolean;
};

export const ArrowButton = forwardRef(
	(
		{ openSideBar, isOpen }: ArrowButtonProps,
		ref: ForwardedRef<HTMLButtonElement>
	) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<button
		ref={ref}
			onClick={openSideBar}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: isOpen,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow_open]: isOpen,
				})}
			/>
		</button>
	);
});
