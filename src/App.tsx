import * as stylex from '@stylexjs/stylex';
import { colors } from './styles/tokens.stylex';
import { useState } from 'react';
import QuestionIcon from './assets/question.svg?react';
import GoList from './assets/list.svg?react';
import QList from './assets/content.json';
const colorStyles = stylex.create({
	red: {
		backgroundColor: colors.red500,
	},
	green: {
		backgroundColor: colors.green500,
	},
	yellow: {
		backgroundColor: colors.yellow500,
	},
	blue: {
		backgroundColor: colors.blue500,
	},
	purple: {
		backgroundColor: colors.purple500,
	},
	brown: {
		backgroundColor: colors.brown500,
	},
});
const colorArr = ['red', 'yellow', 'green', 'blue', 'purple', 'brown'] as const;
const types = [...new Set(QList.content.map(({ type }) => type))].map(
	(type, i) => ({ type, color: colorArr[i] })
);

const styles = stylex.create({
	app: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 30,
		flexWrap: 'wrap',
		padding: 100,
		position: 'relative',
		fontFamily: `'Noto Sans KR', sans-serif`,
		fontOpticalSizing: 'auto',
		fontStyle: 'normal',
		lineHeight: 'normal',
	},
	goList: {
		width: 300,
		height: 300,
	},
});

function App() {
	const [cardType, setCardType] = useState<{
		type: string;
		color: (typeof colorArr)[number];
	}>({ type: '', color: 'red' });
	const filteredCard = QList.content.filter(
		({ type }) => cardType.type === type
	);
	return (
		<div {...stylex.props(styles.app)}>
			{cardType.type && (
				<GoList
					onClick={() => setCardType({ type: '', color: 'red' })}
					{...stylex.props(styles.goList)}
				/>
			)}
			{!cardType.type &&
				types.map(({ type, color }) => (
					<MiniCard
						key={type}
						type={type}
						onClick={() => setCardType({ type, color })}
						color={color}
					/>
				))}
			{filteredCard.map(({ question, type }, i) => (
				<Card
					question={question}
					type={type}
					idx={i + 1}
					color={cardType.color}
				/>
			))}
		</div>
	);
}

const miniCardStyles = stylex.create({
	miniCard: {
		width: 210,
		height: 340,
		borderRadius: 20,
		transformStyle: 'preserve-3d',
		perspectiveOrigin: 'center',
		transition: '0.7s',
		position: 'relative',
		cursor: 'pointer',
		padding: 15,
		boxShadow:
			'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;',
	},
	common: {
		width: '100%',
		height: '100%',
		textAlign: 'center',
		fontSize: '100px',
		borderRadius: 15,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},

	backContent: {
		backgroundColor: colors.red500,
		color: colors.white,
		display: 'flex',
		flexDirection: 'column',
		gap: 20,
	},
	icon: {
		fill: colors.white,
		width: 100,
		height: 100,
	},
	title: {
		fontSize: 40,
	},
});

const MiniCard = ({
	type,
	onClick,
	color,
}: {
	type: string;
	onClick: () => void;
	color: (typeof colorArr)[number];
}) => {
	return (
		<div onClick={onClick} {...stylex.props(miniCardStyles.miniCard)}>
			<div {...stylex.props(miniCardStyles.common)}>
				<div
					{...stylex.props(
						miniCardStyles.common,
						miniCardStyles.backContent,
						colorStyles[color]
					)}
				>
					<QuestionIcon {...stylex.props(miniCardStyles.icon)} />
					<div {...stylex.props(miniCardStyles.title)}>{type}</div>
				</div>
			</div>
		</div>
	);
};

const cardStyles = stylex.create({
	layout: {
		position: 'absolute',
		top: 100,
		userSelect: 'none',
	},
	hidden: {
		display: 'none',
	},
	card: {
		width: 420,
		height: 680,
		borderRadius: 20,
		transformStyle: 'preserve-3d',
		perspectiveOrigin: 'center',
		transition: '0.7s',
		position: 'relative',
		cursor: 'pointer',
		padding: 20,
		boxShadow:
			'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;',
	},

	isFront: {
		transform: {
			default: 'rotateY(180deg)',
		},
	},

	common: {
		width: '100%',
		height: '100%',
		backfaceVisibility: 'hidden',

		textAlign: 'center',
		borderRadius: 15,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},

	cardFront: {
		transform: 'rotateY(180deg)',
		position: 'absolute',
		top: 0,
		left: 0,
		padding: 20,
		fontSize: 40,
		backgroundColor: colors.white,
	},

	cardBack: {
		position: 'relative',
		backgroundColor: colors.red500,
	},
	idx: {
		position: 'absolute',
		color: colors.white,
		top: 0,
		left: 40,
		fontSize: 100,
	},
	backContent: {
		color: colors.white,
		display: 'flex',
		flexDirection: 'column',
		gap: 20,
	},
	icon: {
		fill: colors.white,
		width: 240,
		height: 240,
	},
	title: {
		fontSize: 70,
	},
});

const Card = ({
	question,
	type,
	idx,
	color,
}: {
	question: string;
	type: string;
	idx: number;
	color: (typeof colorArr)[number];
}) => {
	const [isFront, setIsFront] = useState(false);
	const [isDisplay, setIsDisplay] = useState(true);

	const handleClick = () => {
		if (!isFront) {
			setIsFront(true);
			return;
		}
		setIsDisplay(false);
	};

	return (
		<div {...stylex.props(cardStyles.layout, !isDisplay && cardStyles.hidden)}>
			<div
				onClick={handleClick}
				{...stylex.props(cardStyles.card, isFront && cardStyles.isFront)}
			>
				<div
					{...stylex.props(cardStyles.common, cardStyles.cardFront)}
					style={{ backfaceVisibility: 'hidden' }}
				>
					{question}
				</div>
				<div
					{...stylex.props(
						cardStyles.common,
						cardStyles.cardBack,
						colorStyles[color]
					)}
					style={{ backfaceVisibility: 'hidden' }}
				>
					<div {...stylex.props(cardStyles.idx)}>{idx}</div>
					<div {...stylex.props(cardStyles.backContent)}>
						<QuestionIcon {...stylex.props(cardStyles.icon)} />
						<div {...stylex.props(cardStyles.title)}>{type}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
