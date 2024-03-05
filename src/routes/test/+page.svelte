<script lang="ts">
	let isHovered = false;

	function handleClick(groupId) {
		// Handle the click event for the SVG group
		console.log(`SVG group with id ${groupId} clicked!`);
		// Add your custom logic here
	}

	function handleKeyPress(groupId, event) {
		// Handle keyboard events (e.g., pressing Enter) for accessibility
		if (event.key === 'Enter' || event.key === ' ') {
			handleClick(groupId);
		}
	}
</script>

<div>
	<svg
		width="1597"
		height="1941"
		viewBox="0 0 1597 1941"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g id="full">
			<g id="lines">
				<path
					id="L6"
					d="M446 1003L475.179 974.654C478.912 971.028 483.911 969 489.115 969L721.716 969C727.02 969 732.107 966.893 735.858 963.142L789.142 909.858C792.893 906.107 797.98 904 803.284 904L1225 904C1236.05 904 1245 895.046 1245 884L1245 530.284C1245 524.98 1242.89 519.893 1239.14 516.142L1202 479"
					stroke="#9A3488"
					stroke-width="10"
				/>
				<path
					id="L5"
					d="M1382 1341L1149.83 1107.85C1146.1 1104.1 1144 1099.03 1144 1093.74L1144 969.284C1144 963.98 1141.89 958.893 1138.14 955.142L1072.86 889.858C1069.11 886.107 1067 881.02 1067 875.716L1067 638.284C1067 632.98 1064.89 627.893 1061.14 624.142L1008.86 571.858C1005.11 568.107 1000.02 566 994.716 566L590.284 566C584.98 566 579.893 563.893 576.142 560.142L551.858 535.858C548.107 532.107 543.02 530 537.716 530L154 530C142.954 530 134 538.954 134 550L134 955.716C134 961.02 131.893 966.107 128.142 969.858L12.8578 1085.14C9.10709 1088.89 6.99995 1093.98 6.99995 1099.28L7 1301"
					stroke="#179859"
					stroke-width="10"
				/>
				<path
					id="L4A"
					d="M872 1445L1178.72 1445C1184.02 1445 1189.11 1442.89 1192.86 1439.14L1384 1248"
					stroke="#0471B9"
					stroke-width="10"
				/>
				<path
					id="L4"
					d="M1241 442L1426.14 627.142C1429.89 630.893 1432 635.98 1432 641.284L1432 1191.72C1432 1197.02 1429.89 1202.11 1426.14 1205.86L1383.86 1248.14C1380.11 1251.89 1378 1256.98 1378 1262.28L1378 1328.72C1378 1334.02 1380.11 1339.11 1383.86 1342.86L1426.14 1385.14C1429.89 1388.89 1432 1393.98 1432 1399.28L1432 1941"
					stroke="#2D2B73"
					stroke-width="10"
				/>
				<path
					id="L3"
					d="M445 108L671.716 108C677.02 108 682.107 110.107 685.858 113.858L866.142 294.142C869.893 297.893 872 302.98 872 308.284L872 792.5C872 803.546 880.954 812.5 892 812.5L1526 812.5"
					stroke="#6B2C15"
					stroke-width="10"
				/>
				<path
					id="L2"
					d="M972 135V476C972 487.046 963.046 496 952 496H796C784.954 496 776 504.954 776 516V851.716C776 857.02 778.107 862.107 781.858 865.858L866.142 950.142C869.893 953.893 872 958.98 872 964.284V1781"
					stroke="#FAB515"
					stroke-width="10"
				/>
				<path
					id="L1"
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M1570 370C1570 367.239 1567.76 365 1565 365C1562.24 365 1560 367.239 1560 370V375.998L1313.11 376C1305.95 376 1299.08 378.845 1294.02 383.908L1015.91 662.021C1012.72 665.209 1008.4 667 1003.89 667H256C246.611 667 239 659.389 239 650L239 530H229L229 650C229 664.912 241.088 677 256 677H1003.89C1011.05 677 1017.92 674.155 1022.98 669.092L1301.09 390.979C1304.28 387.791 1308.6 386 1313.11 386L1560 385.999V392C1560 394.761 1562.24 397 1565 397C1567.76 397 1570 394.761 1570 392V370Z"
					fill="#D60D27"
				/>
			</g>
			<g id="stations-line-1">
				<g
					id="40-LD"
					tabindex="-1"
					role="button"
					aria-label="Clickable Element"
					class:g-hovered={isHovered}
					on:mouseenter={() => (isHovered = true)}
					on:mouseleave={() => (isHovered = false)}
					on:click={() => handleClick('40-LD')}
					on:keydown={(e) => handleKeyPress('40-LD', e)}
				>
					<circle id="Ellipse 1" cx="1565" cy="381" r="4" fill="white" />
					<!-- <circle id="click-area" cx="1565" cy="381" r="25" fill="#D9D9D9" fill-opacity="0.0" /> -->
				</g>
				<div
					class="clickable-overlay"
					on:click={() => handleClick('40-LD')}
					on:keydown={(e) => handleKeyPress('40-LD', e)}
					tabindex="-1"
					aria-label="Clickable Area"
					role="button"
				></div>
				<g
					id="33-HM"
					on:click={handleClick}
					on:keydown={handleKeyPress}
					tabindex="-1"
					role="button"
					aria-label="Clickable Element"
				>
					<circle id="Ellipse 1_2" cx="1506" cy="381" r="4" fill="white" />
					<circle id="click-area_2" cx="1506" cy="381" r="25" fill="#D9D9D9" fill-opacity="0.1" />
				</g>
				<g id="58-MQ">
					<circle id="Ellipse 1_3" cx="1447" cy="381" r="4" fill="white" />
				</g>
				<g id="27-EM">
					<circle id="Ellipse 1_4" cx="1387" cy="381" r="4" fill="white" />
				</g>
				<g id="3-AL">
					<circle id="Ellipse 1_5" cx="1325" cy="381" r="4" fill="white" />
				</g>
				<g id="32-GO">
					<circle id="Ellipse 1_6" cx="1277" cy="408" r="4" fill="white" />
				</g>
				<g id="93-TB">
					<circle
						id="Ellipse 1_7"
						cx="1242"
						cy="443"
						r="7.5"
						fill="white"
						stroke="black"
						stroke-width="5"
					/>
				</g>
				<g id="41-LEN">
					<circle
						id="Ellipse 1_8"
						cx="1203"
						cy="482"
						r="7.5"
						fill="white"
						stroke="black"
						stroke-width="5"
					/>
				</g>
				<g id="74-PV">
					<circle id="Ellipse 1_9" cx="1162" cy="523" r="4" fill="white" />
				</g>
				<g id="57-MM">
					<circle id="Ellipse 1_10" cx="1129" cy="556" r="4" fill="white" />
				</g>
				<g id="85-SA">
					<circle id="Ellipse 1_11" cx="1095" cy="590" r="4" fill="white" />
				</g>
				<g id="6-BA">
					<circle
						id="Ellipse 1_12"
						cx="1061"
						cy="624"
						r="7.5"
						fill="white"
						stroke="black"
						stroke-width="5"
					/>
				</g>
				<g id="96-UC">
					<circle id="Ellipse 1_13" cx="1010" cy="671" r="4" fill="white" />
				</g>
				<g id="89-SL">
					<circle id="Ellipse 1_14" cx="950" cy="672" r="4" fill="white" />
				</g>
				<g id="15-CH">
					<circle
						id="Ellipse 1_15"
						cx="873"
						cy="672"
						r="7.5"
						fill="white"
						stroke="black"
						stroke-width="5"
					/>
				</g>
				<g id="46-LM">
					<circle id="Ellipse 1_16" cx="822" cy="672" r="4" fill="white" />
				</g>
				<g id="44-LH">
					<circle
						id="Ellipse 1_17"
						cx="776"
						cy="672"
						r="7.5"
						fill="white"
						stroke="black"
						stroke-width="5"
					/>
				</g>
				<g id="83-RP">
					<circle id="Ellipse 1_18" cx="715" cy="672" r="4" fill="white" />
				</g>
				<g id="38-LA">
					<circle id="Ellipse 1_19" cx="647" cy="672" r="4" fill="white" />
				</g>
				<g id="26-EL">
					<circle id="Ellipse 1_20" cx="577" cy="672" r="4" fill="white" />
				</g>
				<g id="97-US">
					<circle id="Ellipse 1_21" cx="511" cy="672" r="4" fill="white" />
				</g>
				<g id="2-AH">
					<circle id="Ellipse 1_22" cx="444" cy="672" r="4" fill="white" />
				</g>
				<g id="23-EC">
					<circle id="Ellipse 1_23" cx="376" cy="672" r="4" fill="white" />
				</g>
				<g id="50-LR">
					<circle id="Ellipse 1_24" cx="309" cy="672" r="4" fill="white" />
				</g>
				<g id="67-PJ">
					<circle id="Ellipse 1_25" cx="245" cy="669" r="4" fill="white" />
				</g>
				<g id="60-NP">
					<circle id="Ellipse 1_26" cx="234" cy="599" r="4" fill="white" />
				</g>
				<g id="91-SP">
					<circle
						id="Ellipse 1_27"
						cx="234"
						cy="530"
						r="7.5"
						fill="white"
						stroke="black"
						stroke-width="5"
					/>
				</g>
			</g>
		</g>
	</svg>
</div>

<style>
	/* Style to make the clickable area larger */
	.clickable-overlay {
		position: absolute;
		top: 500;
		left: 500;
		width: 100%; /* Adjust the width as needed */
		height: 100%; /* Adjust the height as needed */
		cursor: pointer;
		fill-opacity: 1;
		background: #000;
		/* transition: fill-opacity 0.3s ease; Add a transition effect for smooth hover */
	}

	.g-hovered {
		fill-opacity: 1 !important; /* Set the fill-opacity back to 1 when hovered */
	}
</style>
