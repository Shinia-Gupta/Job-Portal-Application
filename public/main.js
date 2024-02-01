function deleteJob(id) {
    const result = confirm('Do you want to delete this job?');
    if (result) {
        fetch('/deleteJob/' + id, {
            method: 'POST'
        }).then(res => {
            if (res.ok) {
                // Redirect to the jobs page
                window.location.href = '/';
            }
        });
    }
}
