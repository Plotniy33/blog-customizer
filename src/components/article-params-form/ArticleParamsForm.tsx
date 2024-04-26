import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

export type ArticleParamsFormProps = {
	data: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [form, setOpenForm] = useState(false);
	const [formData, setFormData] = useState(defaultArticleState);
	const sideBarRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (sideBarRef.current)
			sideBarRef.current.classList.toggle(styles.container_open);
	}, [form]);

	function openForm() {
		setOpenForm(!form);
	}

	useEffect(() => {
		function closeByEsc(event: KeyboardEvent) {
			if (event.key === 'Escape' && form === true) setOpenForm(false);
		}

		function closeByClickOutside(event: MouseEvent) {
			if (
				sideBarRef.current &&
				!sideBarRef.current.contains(event.target as Node)
			) {
				setOpenForm(false);
				// console.log('dfvdfvf');
			}
		}

		document.addEventListener('keydown', closeByEsc);
		document.addEventListener('mousedown', closeByClickOutside);

		return () => {
			document.removeEventListener('keydown', closeByEsc);
			document.removeEventListener('mousedown', closeByClickOutside);
		};
	}, [form]);

	function handleArticleParams(option: OptionType, key: string) {
		setFormData({ ...formData, [key]: option });
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		props.data(formData);
		setOpenForm(false);
	}

	function handleReset() {
		props.data(defaultArticleState);
		setFormData(defaultArticleState);
	}

	return (
		<>
			<ArrowButton isOpen={form} openSideBar={openForm} />
			<aside className={styles.container} ref={sideBarRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text
						as='h2'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase
						dynamicLite>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formData.fontFamilyOption}
						onChange={(option) =>
							handleArticleParams(option, 'fontFamilyOption')
						}
					/>

					<RadioGroup
						name='fontsize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formData.fontSizeOption}
						onChange={(option) => handleArticleParams(option, 'fontSizeOption')}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formData.fontColor}
						onChange={(option) => handleArticleParams(option, 'fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formData.backgroundColor}
						onChange={(option) =>
							handleArticleParams(option, 'backgroundColor')
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formData.contentWidth}
						onChange={(option) => handleArticleParams(option, 'contentWidth')}
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
