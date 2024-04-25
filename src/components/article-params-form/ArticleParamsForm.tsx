import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useEffect, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

export type ArticleParamsFormProps = {};

export const ArticleParamsForm = () => {
	const [form, setOpenForm] = useState(false);
	const sideBarRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if(sideBarRef.current)
			sideBarRef.current.classList.toggle(styles.container_open)
	}, [form])

	function openForm() {
		setOpenForm(!form);
	}

	useEffect(() => {
		function handleByEsc(event: KeyboardEvent) {
			if (event.key === 'Escape' && form === true) setOpenForm(false);
		}
		document.addEventListener('keydown', handleByEsc);
		return () => document.addEventListener('keydown', handleByEsc);
	}, [form]);

	return (
		<>
			<ArrowButton isOpen={form} openSideBar={openForm} />
			<aside className={styles.container} ref={sideBarRef}>
				<form className={styles.form}>
					<Text
						as='h2'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase
						dynamicLite>
						{' '}
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={defaultArticleState.fontFamilyOption}
					/>

					<RadioGroup
						name='fontsize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={defaultArticleState.fontSizeOption}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={defaultArticleState.fontColor}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={defaultArticleState.backgroundColor}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={defaultArticleState.contentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
