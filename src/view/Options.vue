<template lang="pug">
#options
	Card
		h1(slot='title') Options
		Form(:model='optionsModel', label-position='top')
			Form-item(label='Enable light theme for "Features, Business, Explore, Marketplace and Pricing" pages')
				i-switch(v-model='optionsModel.enableOnFeaturesPage')
			Form-item
				Button(type='primary', icon='checkmark-circled', @click='saveOptions') Save
</template>

<script>
export default {
	name: 'options',
	data() {
		return {
			optionsModel: {
				enableOnFeaturesPage: false
			}
		};
	},
	methods: {
		saveOptions() {
			let options = Object.assign({}, this.optionsModel);
			browser.storage.sync.set(options)
				.then(() => {
					this.$Message.success({
						content: 'Saved.',
						closable: true
					});
				})
				.catch(err => {
					let errMsg = err.toString();
					this.$Message.error({
						content: `Save error! \n\n${errMsg}`,
						closable: true
					});
				});

		}
	},
	created() {
		browser.storage.sync.get({
			enableOnFeaturesPage: true
		})
			.then(retrievedOptions => {
				if (Array.isArray(retrievedOptions) && (retrievedOptions.length === 1)) {
					retrievedOptions = retrievedOptions[0];
				}
				this.optionsModel = retrievedOptions;
			})
			.catch(err => {
				let errMsg = err.toString();
				this.$Notice.error({
					title: 'Error',
					desc: `Cannot retrieve your options. \n\n${errMsg}`,
					duration: 3
				});
			});
	}
};
</script>

<style scoped>
#options {
	margin: 1rem;
}
</style>

